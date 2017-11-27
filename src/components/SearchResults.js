import React from 'react';
import DataTable from 'wix-style-react/DataTable';

import staticData from '../data';

export default class SearchResults extends React.Component {
  render() {

    const data = staticData.value.results.map(item => {
      return {
        title: item.title.he_IL,
        phone: item.contact.phone
      };
    });

    return (
      <DataTable
        data={data}
        columns={[
        {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
        {title: 'Name', render: row => <span>{row.title}</span>, width: '40%', minWidth: '100px'},
        {title: 'Phone', render: row => <span>{row.phone}</span>, width: '40%', minWidth: '100px'}
        ]}
        />
    );
  }
}
