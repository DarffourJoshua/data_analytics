import { usePapaParse } from "react-papaparse";
import { PropTypes } from "prop-types";

export default function ReadRemoteFile(props) {
    const { readRemoteFile } = usePapaParse();
    
    const handleReadRemoteFile = () => {
      const { link } = props;
      readRemoteFile(link, {
        header: true,
        worker: true,
        download: true,
        complete: (results) => {
            const value = results.data;
            // const filtered = value.filter((_, i) => i !== 0);
            if(value.length > 0) {
                const headers = Object.keys(value[0])
                props.getColumns(headers);
            }
        },
      });
    };
    return <button onClick={handleReadRemoteFile}>readRemoteFile</button>;
}

ReadRemoteFile.propTypes = {
    link: PropTypes.string.isRequired,
    getColumns: PropTypes.func.isRequired
};