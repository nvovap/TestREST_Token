//
//  ValidationProtocol.swift
//  MoveSHT
//
//  Created by Alexey Bidnyk on 6/27/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import Foundation

protocol ValidationProtocol {
    associatedtype T
    func isValid(object: T?) -> Bool
}
