//
//  ItemTableViewCell.swift
//  TestREST
//
//  Created by Vladimir Nevinniy on 10/19/18.
//  Copyright © 2018 Vladimir Nevinniy. All rights reserved.
//

import UIKit

class ItemTableViewCell: UITableViewCell {

    @IBOutlet weak var imageMy: UIImageView!
    @IBOutlet weak var titleMy: UILabel!
    @IBOutlet weak var descriptionMy: UITextView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
