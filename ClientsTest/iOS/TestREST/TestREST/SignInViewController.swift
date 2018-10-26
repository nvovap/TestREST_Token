//
//  ViewController.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/19/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit
import Alamofire
import SVProgressHUD

class SignInViewController: UIViewController {

    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    
    let app =  (UIApplication.shared.delegate as! AppDelegate)
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func onClickLogin(_ sender: UIButton) {
        
        
        guard validate() else {
            return
        }
        
        let params: [String: Any] = [
            "email": email.text!,
            "password": password.text!,
        ]
        
        SVProgressHUD.show()
        
        request(app.host + "api/login", method: .post, parameters: params).validate().responseJSON { responseJSON in
            
            switch responseJSON.result {
            case .success(let value):
                if let jsonObject = value as? [String: Any] {
                    let app =  (UIApplication.shared.delegate as! AppDelegate)
                    app.token = jsonObject["token"] as? String
                    
                    UserDefaults.standard.set(app.token, forKey: "token")
                    
                    self.performSegue(withIdentifier: "loginOk", sender: self)
                    
                }
            case .failure(let error):
                print(error)
            }
            
            
            SVProgressHUD.dismiss()
        }
        
        
    }
    
    
    // MARK: - Validation
    
    func validate() -> Bool {
      
        if email.text!.isEmpty || !EmailValidator().isValid(object: email.text) {
            email.shake()
            return false
        }
        
        
        return true
    }
    
}

