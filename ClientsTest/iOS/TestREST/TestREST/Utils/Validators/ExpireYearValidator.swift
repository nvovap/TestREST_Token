//
//  ExpireYearValidator.swift
//  MoveSHT
//
//  Created by Aleksey on 7/1/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

struct ExpireYearValidator: ValidationProtocol {
    typealias T = String
    
    func isValid(object: String?) ->Bool {
        if let year = Int(object!) {
            if year < 0 { return false}
            let calendar = Calendar.current
            let calendarYear = calendar.component(.year, from:Date())
            let currentYear = Int(calendarYear)
            if currentYear > 2000 + year {
                return false
            }
        }
        return true
    }
}
