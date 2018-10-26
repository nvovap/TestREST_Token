//
//  NameValidator.swift
//  MoveSHT
//
//  Created by Aleksey on 7/1/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

struct NameValidator: ValidationProtocol {
    typealias T = String
    
    func isValid(object: String?) -> Bool {
        if let object = object {
            return object.range(of: "\\P{Latin}", options: .regularExpression) == nil
        }
        return false
    }
}
