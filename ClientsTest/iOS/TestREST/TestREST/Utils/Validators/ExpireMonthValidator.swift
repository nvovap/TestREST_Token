//
//  ExpireMonthValidator.swift
//  MoveSHT
//
//  Created by Aleksey on 7/1/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

struct ExpireMonthValidator : ValidationProtocol {
    typealias  T = String
    
    func isValid(object:String?) -> Bool {
        if let month = Int(object!) {
            if month > 0 && month < 13 {
                return true
            }
        }
        return false
    }
}
