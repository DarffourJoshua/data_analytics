from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve
import pandas as pd


app = Flask(__name__)
@app.route('/api/data', methods=['POST'])

def post_data():
    XYdata = request.get_json();
    print("Received data:", XYdata)
    # Extract values from XYdata
    x_values = XYdata.get('x', [])  
    y_values = XYdata.get('y', [])
    
    # Process the values as needed
    # Check if 'x_values' and 'y_values' have the same length
    if len(x_values) != len(y_values):
        return jsonify({'error': 'Length mismatch between x and y values'})

    # Flatten the list of lists if 'x_values' is a list of lists
    x_values = [item for sublist in x_values for item in sublist]
    
     # # Custom aggregation function to sum lists element-wise
    def custom_sum(y_values):
        return [sum(map(int, sublist)) if all(isinstance(val, (int, str)) for val in sublist) else sum(sublist) for sublist in zip(*y_values)]

    # Flatten the list of lists if 'y_values' is a list of lists
    y_values = [item for sublist in y_values for item in sublist]
    
    #creating a dataframe
    df = pd.DataFrame({'X': x_values, 'Y': y_values})
    
    # Check for duplicates in 'X values' and sum corresponding 'Y Values'
    df_summed = df.groupby('X')['Y'].agg(custom_sum).reset_index()
    print(df_summed)
    
    # You can return a response as well
    # Convert the DataFrame to JSON string
    df_summed_json = df_summed.to_json(orient='records')
    print("Response data:", df_summed_json)

    # You can print the JSON string for debugging
    
    # Return the JSON string in the response
    return jsonify({'df_summed': df_summed_json})



if __name__ == '__main__':
    CORS(app)
    app.run(debug=True)
    
serve(app, host="0.0.0.0", port=8080)

#Make a post request to the backend file
#Receive the x and y values in the form of a dataframe
#scan the x values and check for:
#    I. duplicates
#    II. null values
#    III. outliers
#    IV. if the x datatype is a string; then check for spellings
