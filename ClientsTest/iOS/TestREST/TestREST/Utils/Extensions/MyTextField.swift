//
//  MyTextField.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/25/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit


extension UITextField {
    
    
    func shake() {
        let animation = CABasicAnimation(keyPath: "position")
        animation.duration = 0.05
        animation.repeatCount = 5
        animation.autoreverses = true
        animation.fromValue = NSValue(cgPoint: CGPoint(x: self.center.x-4, y: self.center.y))
        animation.toValue   = NSValue(cgPoint: CGPoint(x: self.center.x+4, y: self.center.y))
        
        self.layer.add(animation, forKey: "position")
    }
    
}
