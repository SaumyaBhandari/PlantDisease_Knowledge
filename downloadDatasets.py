import pandas as pd
import requests
import os
from multiprocessing import Pool
from tqdm import tqdm

# Define function to download image
def download_image(args):
    index, url, savePath = args
    filename = os.path.join(savePath, f"{index}.jpg")  # name the file using the row index
    try:
        response = requests.get(url)
        with open(filename, 'wb') as f:
            f.write(response.content)
    except:
        print(f"Error downloading {url}")

# read the CSV file
df = pd.read_csv('Tomato Queries.csv')

# create a folder to save the images
savePath = 'Tomato Leaf Dataset/ScrapedImages/GeoKrishi Dataset' 

# Create download folder if it doesn't exist
if not os.path.exists(savePath):
    os.makedirs(savePath)

# define arguments for download_image function
args = [(index, row['Images'], savePath) for index, row in df.iterrows()]

# set number of processes to run in parallel
num_processes = 8

if __name__ == '__main__':
    # create a pool of processes to execute the download_image function in parallel
    with Pool(processes=num_processes) as p:
        for _ in tqdm(p.imap_unordered(download_image, args), total=len(args)):
            pass
