import styled from 'styled-components';
import './DataTable.css';

const Table = styled.table`
width: 100%;
padding: 0 20px;
`

const TableHead = styled.thead`
background-color: #282c34;
color: white;
font-size: 1.25rem;
font-weight: bold;
height: 2.5rem;
`

const DownloadLink = styled.a`
height: 2.5rem;
width: 80%;
text-decoration: none;
font-size: 1.5rem;
`



const DataTable = ({data}) => {

    return (
        <Table>
        <TableHead>
            <tr>
                <td>Name</td>
                <td>Creator</td>
                <td>Thingiverse Link</td>
                <td>Preview</td>
            </tr>
            </TableHead>
            {data.length > 0 && data.map(element => <tr>
                <td>{element.name}</td>
                <td>{element.creator.name}</td>
                <td><DownloadLink href={element.public_url} target='_blank' rel='noreferrer'>Download</DownloadLink></td>
                <td><img src={element.preview_image} alt='preview iamge' style={{height: '150px'}}/></td>
            </tr>)}

    </Table>
    )
}

export default DataTable;