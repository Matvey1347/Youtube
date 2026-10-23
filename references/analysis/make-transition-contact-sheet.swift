import AppKit
import Foundation
let root=URL(fileURLWithPath:CommandLine.arguments[1],isDirectory:true)
let names=["0.05","0.35","0.70","2.65","2.95","3.30","5.85","6.15","6.50","7.05","7.35","7.70","8.40","10.25","10.55","10.90","11.45","11.75","12.10","13.05","13.35","13.70"]
let columns=3,width=640,height=360,labelHeight=26,rows=(names.count+columns-1)/columns
let bitmap=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:columns*width,pixelsHigh:rows*(height+labelHeight),bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
let context=NSGraphicsContext(bitmapImageRep:bitmap)!;NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=context
NSColor(calibratedWhite:0.12,alpha:1).setFill();NSRect(x:0,y:0,width:columns*width,height:rows*(height+labelHeight)).fill()
for(index,name) in names.enumerated(){let column=index%columns,row=index/columns,y=rows*(height+labelHeight)-(row+1)*(height+labelHeight);guard let image=NSImage(contentsOfFile:root.appendingPathComponent("\(name).jpg").path) else {fatalError("Missing frame \(name)")};image.draw(in:NSRect(x:column*width,y:y+labelHeight,width:width,height:height));NSAttributedString(string:"\(name)s",attributes:[.font:NSFont.monospacedSystemFont(ofSize:15,weight:.bold),.foregroundColor:NSColor.white]).draw(at:NSPoint(x:column*width+10,y:y+5))}
context.flushGraphics();NSGraphicsContext.restoreGraphicsState();try bitmap.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:CommandLine.arguments[2]))
