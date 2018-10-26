//
//  SignUpViewController.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/25/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit
import Alamofire
import SwiftPhoneNumberFormatter
import SVProgressHUD

class SignUpViewController: UIViewController {

    @IBOutlet weak var name: UITextField!
    @IBOutlet weak var phone: PhoneFormattedTextField!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    
    let app =  (UIApplication.shared.delegate as! AppDelegate)
    
    override func viewDidLoad() {
        super.viewDidLoad()

        phone.config.defaultConfiguration = PhoneFormat(defaultPhoneFormat: " ### ### ####")
        phone.prefix = "+1 "
        
        if let countryCode = (Locale.current as NSLocale).object(forKey: .countryCode) as? String {
            if countryCode == "UA" {
                phone.config.defaultConfiguration = PhoneFormat(defaultPhoneFormat: "(###) ###-##-##")
                phone.prefix = "+38 "
            }
        }
    }
    

    @IBAction func onClickSignUp(_ sender: UIButton) {
        
        guard validate() else {
            return
        }
        
        SVProgressHUD.show()
        
        let params: [String: Any] = [
            "name": name.text!,
            "phone": phone.text!,
            "email": email.text!,
            "password": password.text!
        ]
    
        
        request(app.host + "api/register", method: .post, parameters: params).validate().responseJSON { responseJSON in
            
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
        if name.text!.isEmpty || !NameValidator().isValid(object:name.text) {
            name.shake()
            return false
        }
        if phone.text!.isEmpty || !PhoneValidator().isValid(object: phone.text) {
            phone.shake()
            return false
        }
        if email.text!.isEmpty || !EmailValidator().isValid(object: email.text) {
            email.shake()
            return false
        }
        
        
        return true
    }

}
