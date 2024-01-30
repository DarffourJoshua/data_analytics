import { useState, } from "react";
import {usePapaParse, useCSVReader, formatFileSize} from 'react-papaparse';
import PropTypes from 'prop-types';
import styles from "./styles";
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';

function ReadCSV () {
    const { CSVReader } = useCSVReader();
    const [column, setColumn] = useState([]);
    const [value, setValue] = useState([]);
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
      );

    return (
        <CSVReader
            onUploadAccepted = {results => {
                const value = results.data;
                const filtered = value.filter((_, i) => i !== 0);
                setColumn(value[0]);
                setValue(filtered)
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

function ReadRemoteFile(props) {
    const { readRemoteFile } = usePapaParse();
    

    const handleReadRemoteFile = () => {
        const { link } = props;

        readRemoteFile(link, {
            header: true,
            worker: true,
            download: true,
            complete: (results) => {
                const value = [];
                const column= [];

                results.data.map(d => {
                    value.push(Object.values(d));
                    column.push(Object.keys(d));
                })
            },
        });
    };
    return <button onClick={handleReadRemoteFile}>readRemoteFile</button>;
}

ReadRemoteFile.propTypes = {
    link: PropTypes.string.isRequired,
};

export {ReadCSV, ReadRemoteFile}