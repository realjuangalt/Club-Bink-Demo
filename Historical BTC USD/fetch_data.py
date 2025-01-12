import requests
import time
from datetime import datetime, timedelta
import json

def get_weekly_timestamps(years=5):
    print("Running get weekly timestamps")
    end_date = datetime.now()
    start_date = end_date - timedelta(days=years*365)
    
    timestamps = []
    current = start_date
    while current <= end_date:
        timestamps.append(int(current.timestamp()))
        current += timedelta(days=7)
    
    return timestamps

def fetch_price(timestamp):
    print(f"Fetching price for timestamp {timestamp}")
    url = f"https://mempool.space/api/v1/historical-price?currency=USD&timestamp={timestamp}"
    try:
        response = requests.get(url)
        print(f"Response status: {response.status_code}")
        response.raise_for_status()
        data = response.json()
        print(f"Parsed JSON data: {data}")
        # Extract the price from the nested structure
        if 'prices' in data and len(data['prices']) > 0:
            return data['prices'][0]['USD']
        else:
            print("Price data not found in the response")
            return None
    except requests.exceptions.HTTPError as http_err:
        if response.status_code == 429:
            print(f"Rate limited. Waiting for 60 seconds.")
            time.sleep(60)
            return fetch_price(timestamp)
        else:
            print(f"HTTP error occurred: {http_err}")
    except json.JSONDecodeError as json_err:
        print(f"JSON decode error: {json_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
    return None

def save_prices(prices, filename='bitcoin_prices.json'):
    with open(filename, 'w') as f:
        json.dump(prices, f, indent=2)
    print(f"Saved {len(prices)} price points to {filename}")

def main():
    print("Running main")
    timestamps = get_weekly_timestamps()
    prices = []  # Define prices list here
    consecutive_failures = 0
    max_consecutive_failures = 5

    try:
        for timestamp in timestamps:
            price = fetch_price(timestamp)
            if price is not None:
                date = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
                prices.append({"date": date, "price": price})
                print(f"Fetched price for {date}: ${price}")
                consecutive_failures = 0
            else:
                print(f"Failed to fetch price for timestamp {timestamp}")
                consecutive_failures += 1
                if consecutive_failures >= max_consecutive_failures:
                    print(f"Reached {max_consecutive_failures} consecutive failures. Moving to next available data.")
                    consecutive_failures = 0
                    continue
            time.sleep(1)  # Be nice to the API

    except KeyboardInterrupt:
        print("\nScript interrupted by user.")
        if prices:  # Save partial data if we have any
            save_prices(prices, 'bitcoin_prices_partial.json')
        return

    # Save complete data if we finished successfully
    if prices:
        save_prices(prices)
    else:
        print("No price data collected. File not created.")

if __name__ == "__main__":
    main()