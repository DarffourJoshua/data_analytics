import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
import PropTypes from "prop-types";


const Diagram = (props) => {
    
    const { datavalues } = props;
  
    const data = {
      labels: datavalues.x, // Assuming you have labels in your data
      datasets: [
        {
          label: 'X Values',
          data: datavalues.x,
          backgroundColor: 'rgba(75,192,192,0.2)', // Customize as needed
          borderColor: 'rgba(75,192,192,1)', // Customize as needed
          borderWidth: 1, // Customize as needed
        },
        {
          label: 'Y Values',
          data: datavalues.y,
          backgroundColor: 'rgba(255,99,132,0.2)', // Customize as needed
          borderColor: 'rgba(255,99,132,1)', // Customize as needed
          borderWidth: 1, // Customize as needed
        },
      ],
    };
  
    const options = {
        // Customize your chart options here
      scales: {
        x: {
          title: {
            display: true,
            text: 'X Axis Label',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Y Axis Label',
          },
        },
      },
      responsive: true
    };
  
    return (
      <Chart
        type={'bar'}
        data={data}
        options={options}
        {...props}
      />
    );
  };

  Diagram.propTypes = {
    datavalues: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string),
        x: PropTypes.arrayOf(PropTypes.array),
        y: PropTypes.arrayOf(PropTypes.array),
      }).isRequired,
  }

  export default Diagram;