import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
guard let ci = CIImage(contentsOf: inURL) else { fatalError("cannot read") }
let handler = VNImageRequestHandler(ciImage: ci, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let obs = req.results?.first else { fatalError("no subject") }
// Full-resolution mask of all instances, scaled to the input image extent
let mask = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
let maskCI = CIImage(cvPixelBuffer: mask)
let ctx = CIContext()
let cs = CGColorSpace(name: CGColorSpace.linearGray)!
try ctx.writePNGRepresentation(of: maskCI, to: outURL, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
print("mask written", maskCI.extent)
