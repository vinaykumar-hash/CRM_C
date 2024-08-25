import React from 'react'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { useSort } from "@table-library/react-table-library/sort";
import { useEffect } from 'react';
import { usePagination } from "@table-library/react-table-library/pagination";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASELINE_THEME = {
    Table: `width: inherit;
    border-radius: ${"0.5rem"};`,
    Header: '',
    Body: '',
    BaseRow: `
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-family: "Mont";
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
        color: ${"#004697"};
        background-color: ${"white"};
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

const Showallrecords = () => {
    const [nodes,NewNodes] = useState([])
    const data = { nodes };
    useEffect(()=>{
      async function FetchSearchChange(cip) {
        try {
          const response = await fetch(`http://localhost:8080/getuniquestd/${cip}`);
          const data = await response.json();
          return data.result;
        } catch (err) {
            console.error("Error fetching data:", err);
            return 0; // Or another appropriate fallback value
        }
          
          }
        async function handleSearchChange(){
          if(PrevSearch===localStorage.getItem("CurrentSearch")){
            //
          }else{
            PrevSearch=localStorage.getItem("CurrentSearch");
            FetchSearchChange(PrevSearch).then((data)=>{
              NewNodes(data);
            })
          }
        }
        localStorage.setItem("CurrentSearch","");
        let PrevSearch = "9918";
        const intervalId = setInterval(handleSearchChange, 1000);
        
        async function FetchTableData() {
          try {
            const response = await fetch('http://localhost:8080/getuniquestd');
            const data = await response.json();
            return data.result;
          } catch (err) {
              console.error("Error fetching data:", err);
              return 0; // Or another appropriate fallback value
          }
            
            }
            FetchTableData().then((data)=>{
              NewNodes(data);
            })
    },[])

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
  const navigate = useNavigate();
  const handleRowClick = (item) => {
    navigate('/conversation/'+item.cip);
    // console.log('Row clicked:', item.cip);
};
  const COLUMNS = [
    { label: 'Name', renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.name}</div>, sort: { sortKey: "Name" }},
    { label: 'CIP' , renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.cip}</div> ,},
    { label: 'DOB' , renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.dob}</div>},
    {
      label: 'Mobile',
      renderCell: (item) =>
        <div onClick={() => handleRowClick(item)}>{item.phone}</div>,
    },
    { label: 'Email' , renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.email}</div>},
    
    { label: 'University', renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.university}</div> },
    {
      label: 'Course',
      renderCell: (item) => <div onClick={() => handleRowClick(item)}>{item.course}</div>,
    },
  ];
  
  
  return (
    <div className='w-full flex flex-col justify-center items-end px-10 gap-5'>
        {/* <button className='rounded-lg font-Mont text-white bg-appblue-500 px-4 py-2 font-semibold right-0'>New Lead</button> */}
        <CompactTable className="foo cursor-pointer" columns={COLUMNS} data={data} theme={theme} sort={sort} pagination={pagination}/>


    <br/>
      <div className= 'px-5 mt-5 transition-all w-full' style={{ display: "flex", justifyContent: "space-between" }}>
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
    </div>
  )
}

export default Showallrecords