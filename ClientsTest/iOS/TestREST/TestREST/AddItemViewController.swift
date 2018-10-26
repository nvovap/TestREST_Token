//
//  AddItemViewController.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/25/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit
import Alamofire
import SVProgressHUD

class AddItemViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    
    @IBOutlet weak var titleText: UITextField!
    @IBOutlet weak var descriptionText: UITextView!
    @IBOutlet weak var image: UIImageView!
    
    let app =  (UIApplication.shared.delegate as! AppDelegate)
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func onClickAddImage(_ sender: Any) {
        let picker = UIImagePickerController()
        
        picker.delegate = self
        picker.allowsEditing = true
        
        present(picker, animated: true, completion: nil)
        
    }
    
    
    @objc func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let pickedImage = info[UIImagePickerController.InfoKey.originalImage.rawValue] as? UIImage {
            DispatchQueue.main.async {
                self.image.image = pickedImage
            }

        }
        
        self.dismiss(animated: true, completion: nil)
    }
    
 
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.dismiss(animated: true, completion: nil)
    }
    
    
    
    @IBAction func onClickSave(_ sender: Any) {
        guard let token = app.token else {
            return
        }
        
        SVProgressHUD.show()
        
        let params: [String: Any] = [
            "title": titleText.text!,
            "description": descriptionText.text!
        ]
        
        
        let headers = HTTPHeaders(dictionaryLiteral: ("authorization", token))
        
        request(app.host + "api/item", method: .put, parameters: params, headers: headers).validate().responseJSON { responseJSON in
            
            switch responseJSON.result {
            case .success(let value):
                if let jsonObject = value as? [String: Any] {
                
                    if let idItem = jsonObject["id"] as? Int {
                        
                        if let img = self.image.image {
                            if let data = img.jpegData(compressionQuality: 1.0) {
                                
                                Alamofire.upload(multipartFormData: { multipartFormData in
                                    multipartFormData.append(data, withName: "fileset",fileName: "file.jpg", mimeType: "image/jpg")
                                }, to:self.app.host + "api/item/\(idItem)/image", headers:headers)
                                { (result) in
                                    switch result {
                                    case .success(let upload, _, _):
                                        
                                        upload.uploadProgress(closure: { (progress) in
                                            print("Upload Progress: \(progress.fractionCompleted)")
                                        })
                                        
                                        upload.responseJSON { response in
                                            print(response.result.value ?? "")
                                            SVProgressHUD.dismiss()
                                            self.performSegue(withIdentifier: "saveAndExit", sender: self)
                                        }
                                        
                                    case .failure(let encodingError):
                                        print(encodingError)
                                        SVProgressHUD.showError(withStatus: encodingError.localizedDescription)
                                        SVProgressHUD.dismiss()
                                    }
                                    
                                   
                                }
                            }
                        } else {
                            SVProgressHUD.dismiss()
                            self.performSegue(withIdentifier: "saveAndExit", sender: self)
                        }
                        
                    } else  {
                        SVProgressHUD.dismiss()
                    }
                    
                    
                }
            case .failure(let error):
                SVProgressHUD.showError(withStatus: error.localizedDescription)
                SVProgressHUD.dismiss()
                print(error)
            }
            
           
            
        }
        
    }
    

}
