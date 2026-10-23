import AppKit
import CoreImage
import CoreImage.CIFilterBuiltins
import Vision
import Foundation

guard CommandLine.arguments.count == 3 else {
  fatalError("Usage: swift scripts/make-editorial-cutouts.swift input.jpg output.png")
}
let input=URL(fileURLWithPath:CommandLine.arguments[1])
let output=URL(fileURLWithPath:CommandLine.arguments[2])
let request=VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler=VNImageRequestHandler(url:input,options:[:])
try handler.perform([request])
guard let maskBuffer=request.results?.first?.pixelBuffer else { fatalError("No foreground person found in \(input.path)") }
let source=CIImage(contentsOf:input,options:[.applyOrientationProperty:true])!
let rawMask=CIImage(cvPixelBuffer:maskBuffer)
let scaleX=source.extent.width/rawMask.extent.width
let scaleY=source.extent.height/rawMask.extent.height
let mask=rawMask.transformed(by:CGAffineTransform(scaleX:scaleX,y:scaleY)).cropped(to:source.extent)
let softMask=CIFilter.gaussianBlur();softMask.inputImage=mask;softMask.radius=1.2
let croppedMask=softMask.outputImage!.cropped(to:source.extent)
let blend=CIFilter.blendWithMask();blend.inputImage=source;blend.backgroundImage=CIImage(color:.clear).cropped(to:source.extent);blend.maskImage=croppedMask
let context=CIContext(options:[.useSoftwareRenderer:false])
guard let image=context.createCGImage(blend.outputImage!.cropped(to:source.extent),from:source.extent) else { fatalError("Could not render cutout") }
let bitmap=NSBitmapImageRep(cgImage:image)
try bitmap.representation(using:.png,properties:[:])!.write(to:output)
print("Wrote transparent mask: \(output.path) (\(image.width)×\(image.height))")
