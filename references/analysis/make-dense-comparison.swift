import AppKit
import AVFoundation
import Foundation

struct Clip { let name:String; let url:URL; let secondsScale:Double }
let repo=URL(fileURLWithPath:CommandLine.arguments[1],isDirectory:true)
let out=repo.appendingPathComponent("reports/editorial-typography-frames",isDirectory:true)
try FileManager.default.createDirectory(at:out,withIntermediateDirectories:true)
let clips=[
  Clip(name:"SOURCE · portrait · time normalized",url:repo.appendingPathComponent("references/originals/editorial-typography.mp4"),secondsScale:17.513991/14),
  Clip(name:"PREVIOUS · v1",url:repo.appendingPathComponent("projects/editorial-typography/archive/editorial-typography-v1.mp4"),secondsScale:1),
  Clip(name:"UPDATED · v2",url:repo.appendingPathComponent("out/editorial-typography-v2.mp4"),secondsScale:1)
]
let cellW=360,cellH=203,labelH=26,rowH=cellH+labelH
let generators=clips.map { clip -> AVAssetImageGenerator in
  let generator=AVAssetImageGenerator(asset:AVURLAsset(url:clip.url))
  generator.appliesPreferredTrackTransform=true
  generator.maximumSize=CGSize(width:cellW,height:cellH)
  generator.requestedTimeToleranceBefore=CMTime(value:1,timescale:30)
  generator.requestedTimeToleranceAfter=CMTime(value:1,timescale:30)
  return generator
}
let cuts=[2.4,5.6,6.4,9.6,11.2,13.6]
let offsets=[-0.4,-0.2,0,0.2,0.4,0.6]
for cut in cuts {
  let rows=offsets.count, cols=clips.count
  let bitmap=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:cols*cellW,pixelsHigh:rows*rowH,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
  let context=NSGraphicsContext(bitmapImageRep:bitmap)!
  NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=context
  NSColor(calibratedWhite:0.08,alpha:1).setFill();NSRect(x:0,y:0,width:cols*cellW,height:rows*rowH).fill()
  for (row,offset) in offsets.enumerated() {
    let t=max(0.0,min(13.95,cut+offset))
    for (col,clip) in clips.enumerated() {
      let generator=generators[col]
      let sourceTime=CMTime(seconds:t*clip.secondsScale,preferredTimescale:600)
      guard let cg=try? generator.copyCGImage(at:sourceTime,actualTime:nil) else { fatalError("Could not extract \(clip.name) at \(t)s") }
      let ns=NSImage(cgImage:cg,size:NSSize(width:cg.width,height:cg.height))
      let ratio=min(Double(cellW)/Double(cg.width),Double(cellH)/Double(cg.height))
      let w=Double(cg.width)*ratio,h=Double(cg.height)*ratio
      let x=Double(col*cellW)+(Double(cellW)-w)/2
      let y=Double((rows-row-1)*rowH+labelH)+(Double(cellH)-h)/2
      ns.draw(in:NSRect(x:x,y:y,width:w,height:h))
      let title="\(clip.name)  ·  \(String(format:"%.1f",t))s"
      NSAttributedString(string:title,attributes:[.font:NSFont.monospacedSystemFont(ofSize:11,weight:.medium),.foregroundColor:NSColor.white]).draw(at:NSPoint(x:Double(col*cellW+8),y:Double((rows-row-1)*rowH+7)))
    }
  }
  context.flushGraphics();NSGraphicsContext.restoreGraphicsState()
  let name=String(format:"transition-%04dms.png",Int(cut*1000))
  try bitmap.representation(using:.png,properties:[:])!.write(to:out.appendingPathComponent(name))
}
print("Wrote 6 transition sheets × 6 samples at 0.2s spacing, with normalized source / previous pilot / updated pilot.")
