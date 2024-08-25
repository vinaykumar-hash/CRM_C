import * as React from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useSort } from "@table-library/react-table-library/sort";
import { useEffect } from 'react';
import { usePagination } from "@table-library/react-table-library/pagination";
import { useState } from 'react';
// const nodes = [
//     {
//       id: '0',
//       name: 'Test User',
//       mobile: "919878675645",
//       address: "JK,India",
//       course: "Design",
//       university: "UC",
//       status: "Applied",
//     },
//     {
//         id: '1',
//         name: 'Test User2',
//         mobile: "918878675645",
//         address: "JK,India",
//         course: "Design",
//         university: "UC",
//         status: "Applied",
//       }
//   ];
  const BASELINE_THEME = {
    Table: '',
    Header: '',
    Body: '',
    BaseRow: `
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-family: "Mont";
        border-radius: ${"0.5rem"};
    `,
    HeaderRow: `
      color: ${"#575757"};
      background-color: ${"#F8F8F8"};
      border-radius: ${"0.5rem"};
      letter-spacing: ${"-0.0325rem"};
    `,  
    Row: `
      color: ${"#202020"};
      font-weight: 500;
  
      &.disabled {
        color: ${"#ffffff"};
      }
  
      &:hover {
        color: ${"#000000"};
        background-color: ${"#F8F8F8"};
        border-radius: ${"0.5rem"};
      }
  
      &:not(:last-of-type) > .td {
        border-bottom: 1px solid ${"#ffffff"};
      }
    `,
    BaseCell: `
      padding: 0.46875rem 12px;
    `,
    HeaderCell: `
      font-weight: 500;
  
      .resizer-handle {
        background-color: ${"#202020"};
      }
  
      svg,
      path {
        fill: currentColor;
      }
    `,
    Cell: `
      &:focus {
        outline: dotted;
        outline-width: 1px;
        outline-offset: -1px;
      }
    `,
  };
const key = 'Compact Table';

const HeroPageTable = () => {
  let Timeline = "Daily";
  const [nodes,NewNodes] = useState([])
  useEffect(()=>{
    async function FetchTableData(status) {
      try {
          const response = await fetch('http://localhost:8080/getcertaincat/'+status);
          const data = await response.json();
          return data.result;
      } catch (err) {
          console.error("Error fetching data:", err);
          return 0; // Or another appropriate fallback value
      }
      }
    
    const NameButtons = ["accepted","applied","hp","pa","lost"];
    let table = document.getElementById("scrolltable");
    NameButtons.forEach((el)=>{
      let TempButton = document.getElementById(el);
      TempButton.addEventListener('click',function(){
        FetchTableData(el).then(data=>{
          // console.log(data);
          NewNodes(data);
        })
        table.scrollIntoView({
          behavior:"smooth",
          block:"start"
        })
      })
    })
    
    
  },[])
  const data = { nodes };


  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }



  const theme = useTheme(BASELINE_THEME);
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        Name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        Mobile: (array) => array.sort((a, b) => a.mobile - b.mobile),
        // TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        // COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        // TASKS: (array) =>
        //   array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: 'Name', renderCell: (item) => item.name, sort: { sortKey: "Name" }, },
    {
      label: 'Mobile',
      renderCell: (item) =>
        item.phone,
    },
    { label: 'Address', renderCell: (item) => item.address, },
    {
      label: 'Course',
      renderCell: (item) => item.course,
    },
    { label: 'University', renderCell: (item) => item.university },
    { label:"Status" , renderCell: (item) => item.status}
  ];

  return (<div id='scrolltable' className='ShadowBorder p-5 mb-5 w-full'>
    <CompactTable className="foo" columns={COLUMNS} data={data} theme={theme} sort={sort} pagination={pagination}/>


    <br/>
      <div className= 'px-5 mt-5 transition-all' style={{ display: "flex", justifyContent: "space-between" }}>
        <span className='font-Mont tracking-tight font-medium text-appblack-500'>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span className='font-Mont tracking-tight font-medium text-appblack-500 text-base'>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
                background: pagination.state.page === index ? "#004697" : "white",
                color: pagination.state.page === index ? "white" : "black",
                margin:" 0rem 0.25rem ",
                padding:"0.25rem 0.5rem",
                borderRadius:"20%"
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>

      <br />
  </div>)
};
export default HeroPageTable;