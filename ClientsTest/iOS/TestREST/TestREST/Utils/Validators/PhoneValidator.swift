//
//  PhoneValidator.swift
//  MoveSHT
//
//  Created by Alexey Bidnyk on 6/27/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

struct PhoneValidator: ValidationProtocol {
    typealias T = String
    
    func isValid(object: String?) -> Bool {
        let regex = "^\\+?([0-9]{2}) \\(?([0-9]{3})\\) ?([0-9]{3})?[-. ]?([0-9]{2})?[-. ]?([0-9]{2})$"
        //"^(\\+?\\d+)?\\s*(\\(\\d+\\))?[\\s-]*([\\d-]*)$"
        let predicate = NSPredicate(format: "SELF MATCHES %@", regex)
        
        return predicate.evaluate(with: object)
    }
}


