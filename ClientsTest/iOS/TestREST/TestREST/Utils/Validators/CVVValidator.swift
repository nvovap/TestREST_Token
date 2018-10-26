//
//  CVVValidator.swift
//  MoveSHT
//
//  Created by Aleksey on 7/1/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

struct CVVValidator: ValidationProtocol {
    typealias T = String
    
    func isValid(object: String?) -> Bool {        
        let regex = "[0-9]{3-4}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", regex)
        
        return predicate.evaluate(with: object)
    }
}
