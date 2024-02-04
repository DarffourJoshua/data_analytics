import PropTypes from "prop-types";

export default function SelectXY(props) {
    const {columns, xyValues, handleXYValues,} = props
    return(
       <article>
        <label 
            htmlFor="xvalues">
                Choose the x value:
        </label>
        <select 
            name="xvalues" 
            id="xvalues" 
            onChange={(e) => handleXYValues(e)}
            value={xyValues.xvalues}
        >
        <option value="" disabled>Select an option</option>
        {columns.map(xcol => (<option value={xcol} key={xcol}>{xcol}</option>))}
        </select>
        
        <label 
            htmlFor="yvalues">
                Choose the y value:
        </label>
        <select 
            name="yvalues" 
            id="yvalues" 
            onChange={(e) => handleXYValues(e)}
            value={xyValues.yvalues}
        >
        <option value="" disabled>Select an option</option>
        {columns.map(ycol => (<option value={ycol} key={ycol}>{ycol}</option>))}
         </select>
       </article>
    );
}

SelectXY.propTypes = {
    columns: PropTypes.array,
    xyValues: PropTypes.any,
    handleXYValues: PropTypes.func,
    getColumnValues: PropTypes.func
};