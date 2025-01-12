import requests
import json
import os


def get_p2p_market_data(currency):
    try:
        # Get p2p Data from API
        p2p_volume_buy = f"https://api.yadio.io/market/stats?currency={currency}&side=buy"
        p2p_ads_buy = f"https://api.yadio.io/market/ads?currency={currency}&side=buy&limit=50"
        
        p2p_volume_sell = f"https://api.yadio.io/market/stats?currency={currency}&side=sell"
        p2p_ads_sell = f"https://api.yadio.io/market/ads?currency={currency}&side=sell&limit=50"
     
    # Parse json        
        p2p_volume_buy_response = requests.get(p2p_volume_buy).json()
        p2p_volume_sell_response = requests.get(p2p_volume_sell).json()
        p2p_ads_sell_response = requests.get(p2p_ads_sell).json()
        p2p_ads_buy_response = requests.get(p2p_ads_buy).json()

        # print(f"debug 30")
        # print(f"p2p_volume_buy: {p2p_volume_buy_response}")
        # print(f"p2p_volume_sell: {p2p_volume_buy_response}")
        # print(f"p2p_ads_buy: {p2p_ads_buy_response}")
        # print(f"p2p_ads_sell: {p2p_ads_sell_response}")

        # Sort top 3 buy side p2p exchanges
        ads_count = p2p_volume_buy_response['stats']['ads_count']
        sorted_exchanges = sorted(ads_count.items(), key=lambda x: x[1], reverse=True)
        top_3_exchanges_buy = [exchange[0] for exchange in sorted_exchanges[:3]]
        blacklist = {"Lnp2pBot", "P2PCoins"}  # Add exchanges you want to exclude here

        buy_whitelist = set(top_3_exchanges_buy) - blacklist
        # print("Top 3 buy side exchanges:", buy_whitelist)

        # Sort top 3 sell side p2p exchanges
        ads_count = p2p_volume_sell_response['stats']['ads_count']
        sorted_exchanges = sorted(ads_count.items(), key=lambda x: x[1], reverse=True)
        top_3_exchanges_sell = [exchange[0] for exchange in sorted_exchanges[:3]]

        sell_whitelist = set(top_3_exchanges_sell) - blacklist
        # print("Top 3 sell side exchanges:", sell_whitelist)

        # Sort top buy and sell ads by volume
        top_buy_ads = [ad for ad in p2p_ads_buy_response["ads"] if ad["exchange"] in buy_whitelist]
        top_sell_ads = [ad for ad in p2p_ads_sell_response["ads"] if ad["exchange"] in sell_whitelist]  

        # Sort buy and sell ads separately by price
        sorted_buy_ads = sorted(top_buy_ads, key=lambda ad: ad["price"], reverse=True)
        sorted_sell_ads = sorted(top_sell_ads, key=lambda ad: ad["price"], reverse=True)

        # Prepare output structure
        output = {
            "Sell Orders": [
                {
                    "Price": f"{ad['price'] / 1_000_000:,.2f}M COP",
                    "Exchange": ad["exchange"],
                    "Feedback Score": ad["feedback_score"],
                    "Payment Method": ad["payment_method"],
                    "Ad URL": ad["ad_url"],
                    "Order Type": "sell"
                }
                for ad in sorted_sell_ads
            ],
            "Buy Orders": [
                {
                    "Price": f"{ad['price'] / 1_000_000:,.2f}M COP",
                    "Exchange": ad["exchange"],
                    "Feedback Score": ad["feedback_score"],
                    "Payment Method": ad["payment_method"],
                    "Ad URL": ad["ad_url"],
                    "Order Type": "buy"
                }
                for ad in sorted_buy_ads
            ]
        }

        # Print Sell Ads
        print("Sell Orders:")
        for ad in sorted_sell_ads:
            formatted_price = f"{ad['price'] / 1_000_000:,.2f}M COP"
            print(f"Price: {formatted_price}, Exchange: {ad['exchange']}, Feedback Score: {ad['feedback_score']}, Payment Method: {ad['payment_method']}, Ad_url: {ad['ad_url']}, Order Type: sell")

        # Print Buy Ads
        print("Buy Orders:")
        for ad in sorted_buy_ads:
            formatted_price = f"{ad['price'] / 1_000_000:,.2f}M COP"
            print(f"Price: {formatted_price}, Exchange: {ad['exchange']}, Feedback Score: {ad['feedback_score']}, Payment Method: {ad['payment_method']}, Ad_URL: {ad['ad_url']}, Order Type: buy")

        # Save to JSON file
        output_folder = "p2p_raw_data/COP"
        os.makedirs(output_folder, exist_ok=True)  # Create the folder if it doesn't exist
        output_file = os.path.join(output_folder, "order_book.json")

        with open(output_file, "w", encoding="utf-8") as file:
            json.dump(output, file, indent=4)

        print(f"\nOrder book saved to {output_file}")



        # # # Fetch buy orders
        # buy_orders = top_buy_ads
        # best_buy_price = min([order['price'] for order in buy_orders], default=None)

        # # # Fetch sell orders
        # sell_orders = top_sell_ads
        # best_sell_price = max([order['price'] for order in sell_orders], default=None)

        # # Calculate optimal price
        # if best_buy_price and best_sell_price:
        #     optimal_price = (best_buy_price + best_sell_price) / 2
        # else:
        #     optimal_price = last_trade_price  # Fallback to last trade price if no orders

        return {
            'p2p_volume_buy.json': p2p_volume_buy_response,
            'p2p_volume_sell.json': p2p_volume_sell_response,
            'p2p_ads_sell.json': p2p_ads_sell_response,
            'p2p_ads_buy.json': p2p_ads_buy_response,   
            # "last_trade_price": last_trade_price,
            # "best_buy_price": best_buy_price,
            # "best_sell_price": best_sell_price,
            # "optimal_price": optimal_price
        }
    except Exception as e:
        print(f"Error fetching market data: {e}")
        return None


def save_api_responses_to_files(api_responses, currency):
    """
    Saves JSON data from multiple API responses to individual files in a specified subfolder in pretty-printed format.

    :param api_responses: A dictionary where keys are file names and values are API response URLs.
    :param currency: The currency name to be used as the subfolder name.
    """
    folder_name = 'p2p_raw_data'
    subfolder_name = os.path.join(folder_name, currency)
    
    # Create the subfolder if it doesn't exist
    if not os.path.exists(subfolder_name):
        os.makedirs(subfolder_name)
    
    # Check if the subfolder is empty
    if not any(os.listdir(subfolder_name)):
        for file_name, api_url in api_responses.items():
            try:
                # Make the API request
                response = requests.get(api_url)

                # Check if the request was successful
                if response.status_code == 200:
                    # Parse the JSON response
                    json_data = response.json()
                    
                    # Define the file path
                    file_path = os.path.join(subfolder_name, file_name)
                    
                    # Write the JSON data to a file in pretty print format
                    with open(file_path, 'w') as file:
                        json.dump(json_data, file, indent=4)
                    
                    print(f"Data has been written to {file_path}")
                else:
                    print(f"Failed to retrieve data for {file_name}. Status code: {response.status_code}")
            except requests.exceptions.RequestException as e:
                print(f"An error occurred for {file_name}: {e}")
    else:
        print(f"The subfolder {subfolder_name} is not empty. Skipping API requests.")


# # Example usage
# api_responses = {
#     'p2p_volume_buy.json': p2p_volume_buy
#     'p2p_volume_sell.json': p2p_volume_sell
#     'p2p_ads_sell.json': p2p_ads_sell
#     'p2p_ads_buy.json': p2p_ads_buy
# }

def calculate_btc_amount(local_currency_amount, optimal_price):
    if optimal_price is None or optimal_price <= 0:
        raise ValueError("Invalid optimal price for BTC calculation.")
    return local_currency_amount / optimal_price

def main():
    # Input for country and local currency
    # country = input("Enter the country (e.g., Colombia): ").strip()
    currency = input(f"Enter the fiat currency ticker (e.g., COP for Colombia): ").strip().upper()
        # Get the API responses
    api_responses = get_p2p_market_data(currency)
    
    # Call the function with the currency and API responses
    if api_responses:
        save_api_responses_to_files(api_responses, currency)
    # Fetch market data
    
    print(f"Writing raw data to json")

    save_api_responses_to_files(api_responses, currency)

    market_data = get_p2p_market_data(currency)

    if market_data is None:
        print("Could not fetch market data. Please try again later.")
        return

    # Display fetched market data
    # print("\nMarket Data:")
    # print(f"Last Trade Price: {market_data['last_trade_price']} {currency}/BTC")
    # print(f"Best Buy Price: {market_data['best_buy_price']} {currency}/BTC")
    # print(f"Best Sell Price: {market_data['best_sell_price']} {currency}/BTC")
    # print(f"Optimal Price: {market_data['optimal_price']} {currency}/BTC")
    
    # Input local currency amount
    try:
        local_currency_amount = float(input(f"\nEnter the amount of {currency} you want to invest: "))
        btc_amount = calculate_btc_amount(local_currency_amount, market_data['optimal_price'])
        print(f"\nWith {local_currency_amount} {currency}, you can buy {btc_amount:.8f} BTC at the optimal price of {market_data['optimal_price']} {currency}/BTC.")
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
