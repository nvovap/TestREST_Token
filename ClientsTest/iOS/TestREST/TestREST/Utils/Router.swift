//
//  Router.swift
//  MoveSHT
//
//  Created by Aleksey on 7/22/17.
//  Copyright © 2017 Vladimir Nevinniy. All rights reserved.
//

import UIKit


class Router {
    
    var window: UIWindow
    var rootViewController: UIViewController!
    
    let app =  (UIApplication.shared.delegate as! AppDelegate)
    
    
    init(window: UIWindow) {
        self.window = window
    }
    
    func setupStartScreen() {
        if app.token != nil {
            showMainScreen()
        } else {
            showAuthorizationScreen()
        }
                
    }
    
    func showAuthorizationScreen() {
        if let loginViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "SignInViewController") as? SignInViewController {
            self.setRootViewController(loginViewController)
        }
    }
    
    func showMainScreen() {
        if let mainScreen = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "mainView") as? UINavigationController {
            self.window.rootViewController = mainScreen
        }
    }
    
    
    private func setRootViewController(_ viewController: UIViewController) {
        let navController = UINavigationController(rootViewController: viewController)
        navController.isNavigationBarHidden = true
        self.window.rootViewController = navController
    }
    

}
