import AppKit
import Foundation

let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true)
let times = Array(0...17)
let columns = 3
let rows = 6
let cellWidth = 360
let cellHeight = 640
let labelHeight = 30
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: columns * cellWidth, pixelsHigh: rows * (cellHeight + labelHeight), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
let context = NSGraphicsContext(bitmapImageRep: bitmap)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = context
NSColor(calibratedWhite: 0.12, alpha: 1).setFill()
NSRect(x: 0, y: 0, width: columns * cellWidth, height: rows * (cellHeight + labelHeight)).fill()
for (index, second) in times.enumerated() {
  let column = index % columns
  let rowFromTop = index / columns
  let y = rows * (cellHeight + labelHeight) - (rowFromTop + 1) * (cellHeight + labelHeight)
  let imagePath = root.appendingPathComponent("editorial-\(second).jpg").path
  guard let image = NSImage(contentsOfFile: imagePath) else { fatalError("Missing frame: \(imagePath)") }
  image.draw(in: NSRect(x: column * cellWidth, y: y + labelHeight, width: cellWidth, height: cellHeight))
  let label = NSAttributedString(string: String(format: "%02d.0s", second), attributes: [.font: NSFont.monospacedSystemFont(ofSize: 18, weight: .bold), .foregroundColor: NSColor.white])
  label.draw(at: NSPoint(x: column * cellWidth + 12, y: y + 6))
}
context.flushGraphics()
NSGraphicsContext.restoreGraphicsState()
let output = root.appendingPathComponent("editorial-typography-contact-sheet.png")
try bitmap.representation(using: .png, properties: [:])!.write(to: output)
print(output.path)
