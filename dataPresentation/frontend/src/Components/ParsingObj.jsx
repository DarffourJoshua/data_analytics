import { useState, } from "react";
import {useCSVReader, formatFileSize} from 'react-papaparse';
import styles from "./styles";
import PropTypes from "prop-types";
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';

export default function ReadCSV (props) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);
  const {getColumns, getData} = props;
  
  return (
    <CSVReader
      onUploadAccepted = {results => {
        const value = results.data;
        const filtered = value.filter((_, i) => i !== 0);
        getColumns(value[0]);
        getData(filtered);
      }}
        
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}

      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }} 
    >
      {({
        getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
        }) => (
            <>
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <>
                  <div style={styles.file}>
                    <div style={styles.info}>
                      <span style={styles.size}>
                        {formatFileSize(acceptedFile.size)}
                      </span>
                      <span style={styles.name}>{acceptedFile.name}</span>
                    </div>
                    <div style={styles.progressBar}>
                    <ProgressBar />
                    </div>
                    <div
                      {...getRemoveFileProps()}
                      style={styles.remove}
                      onMouseOver={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(styles.REMOVE_HOVER_COLOR_LIGHT);
                      }}
                      onMouseOut={(event) => {
                        event.preventDefault();
                        setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                      }}
                    >
                      <Remove color={removeHoverColor} />
                    </div>
                  </div>
                </>
              ) : (
                'Drop CSV file here or click to upload'
              )}
            </div>
          </>
          )}
        </CSVReader>
      );
}

ReadCSV.propTypes = {
  getColumns: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired
}