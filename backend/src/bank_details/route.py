from flask import Blueprint, jsonify

bank_bp = Blueprint("bank", __name__)

# Bank details for 4 farmers
BANK_DETAILS = {
    1: {
        "customer_name": "Jit Debnath",
        "age": 42,
        "address": "Nadia, West Bengal, India",
        "account_number": "37693580219",
        "ifsc_code": "SBIN0000456",
        "branch": "Nadia Main Branch",
        "account_type": "Savings Account",
        "balance": 125000.50,
        "currency": "INR",
        "customer_id": "SBIX001234",
        "micr_code": "741002001",
        "branch_address": "College Para, Krishnagar, Nadia - 741101",
        "loan_amount": 500000.00,
        "government_subsidy": 25000.00,
        "loan_type": "Crop Cultivation Loan",
    },
    2: {
        "customer_name": "Arun Bhaskar",
        "age": 38,
        "address": "South 24 Pargana, West Bengal, India",
        "account_number": "52019843761",
        "ifsc_code": "SBIN0000789",
        "branch": "Baruipur Branch",
        "account_type": "Current Account",
        "balance": 2876340.25,
        "currency": "INR",
        "customer_id": "SBIX005678",
        "micr_code": "700144001",
        "branch_address": "Baruipur Station Road, South 24 Parganas - 700144",
        "loan_amount": 800000.00,
        "government_subsidy": 0.00,
        "loan_type": "Farm Equipment Loan",
    },
    3: {
        "customer_name": "Narendra Modi",
        "age": 65,
        "address": "Murshidabad, West Bengal, India",
        "account_number": "91432056718",
        "ifsc_code": "SBIN0000234",
        "branch": "Baharampur Branch",
        "account_type": "Pension Account",
        "balance": 75680.75,
        "currency": "INR",
        "customer_id": "SBIX009876",
        "micr_code": "742101001",
        "branch_address": "N.H. 34, Baharampur, Murshidabad - 742101",
        "loan_amount": 1000000.00,
        "government_subsidy": 10000.00,
        "loan_type": "Agricultural Loan",
    },
    4: {
        "customer_name": "Mukesh Ambani",
        "age": 55,
        "address": "Nadia, West Bengal, India",
        "account_number": "65328019427",
        "ifsc_code": "SBIN0000678",
        "branch": "Kalyani Branch",
        "account_type": "Premium Account",
        "balance": 10000000.00,
        "currency": "INR",
        "customer_id": "SBIX004321",
        "micr_code": "741235001",
        "branch_address": "Kalyani Central Plaza, Nadia - 741235",
        "loan_amount": 20000000.00,
        "government_subsidy": 500000.00,
        "loan_type": "Agribusiness Expansion Loan",
    },
}


def validate_user_id(user_id):
    return isinstance(user_id, int) and 1 <= user_id <= 2147483647


@bank_bp.route("/<int:user_id>", methods=["GET"])
def get_bank_details(user_id):
    if not validate_user_id(user_id):
        return jsonify({"error": "Invalid user ID"}), 400

    details = BANK_DETAILS.get(user_id)

    if details:
        return (
            jsonify(
                {
                    "user_id": user_id,
                    "bank_name": "State Bank of India",
                    "bank_details": details,
                    "status": "success",
                }
            ),
            200,
        )
    else:
        return jsonify({"error": "Bank details not found", "status": "error"}), 404
