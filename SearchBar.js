// import React from 'react';







// function SearchBar() {

//     return (
//         <>
//             <Search>
//                 <SearchIconWrapper>
//                     <SearchIcon />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                     placeholder="Search…"
//                     inputProps={{ 'aria-label': 'search' }}
//                 />
//             </Search>
//         </>
//     )
// }

// export default SearchBar


//
import React, { useState, useRef } from "react";
import { showUser } from "./FunctionQuery";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import QueryUser from "./QueryUser";
import { db } from "./Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SearchBar() {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));


    const inputSearch = useRef();
    const [searchedResult, setSearchedResult] = useState([]);
    const navigate = useNavigate();

    const showResults = async () => {
        setSearchedResult([]);
        let querySearch = inputSearch.current.children[0].value;
        console.log(querySearch)
        querySearch = querySearch.split(" ").join("").toLowerCase();
        setSearchedResult([]);
        const q = query(
            collection(db, "profile"),
            where("name", ">=", querySearch),
            where("name", "<=", querySearch + "\uf8ff")
        );
        const querySearchnapshot = await getDocs(q);
        // setSearchedResult([]);
        // querySearchnapshot.forEach((doc) => {
        //     setSearchedResult((val) => [...val, doc.data()]);
        // });

        if (querySearch.length === 0) {
            setSearchedResult([]);
        }
    };
console.log("searchBar")
    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        ref={inputSearch}
                        // onChange={() => {
                        //     setSearchedResult([]);
                        //     showResults();
                        // }}
                        // inputProps={{ "aria-label": "search" }}
                    />
                    <div spacing={2} sx={{ width: 300 }}>
                        {searchedResult.map((e, index) => {
                            return (
                                <QueryUser
                                    // show={() => {
                                    //     showUser(e.userID, navigate);
                                    // }}
                                    // set={() => {
                                    //     setSearchedResult([]);
                                    // }}
                                    key={index}
                                    src={e.dp}
                                    name={e.name}
                                />
                            );
                        })}
                    </div>
                </Search>
            </Stack>
        </>
    );
}
