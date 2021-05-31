import React, { useState, useEffect, useRef } from "react";
import isBoolean from "lodash/isBoolean";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import RootRef from "@material-ui/core/RootRef";
import Skeleton from "@material-ui/lab/Skeleton";

import clsx from "clsx";

import StatusImg from "@/components/table/StatusImg";



// thead
function EnhancedTableHead(props) {
    const {
        columns = [],
        classes = {},
        order = false,
        orderBy = null,
        onRequestSort = () => { }
    } = props;

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead classes={{ root: classes.tableHead }}>
            <TableRow>
                {columns.map((col, colIndex) => {
                    let fixedStyle = {};
                    if (col.fixed) {
                        let left = 0;
                        if (colIndex > 0) {
                            left = columns[colIndex - 1].width;
                        }
                        fixedStyle = {
                            position: "sticky",
                            left,
                            zIndex: 2
                        }
                    }

                    return (
                        <TableCell
                            key={col.id}
                            classes={{ root: classes.th }}
                            style={{
                                minWidth: col.width,
                                maxWidth: col.width,
                                width: col.width,
                                ...fixedStyle
                            }}
                        >
                            {
                                col.order
                                    ? (
                                        <TableSortLabel
                                            classes={{
                                                root: classes.sort,
                                                icon: classes.sort,
                                                active: classes.active
                                            }}
                                            active={orderBy === col.id}
                                            direction={orderBy === col.id ? order : "desc"}
                                            onClick={createSortHandler(col.id)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    )
                                    : (
                                        <span className={classes.emptySymbolWrap}>
                                            {col.label}
                                            <i className={classes.emptySymbol} />
                                        </span>
                                    )
                            }
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}


// 頁數切換功能 - 第一頁＆最後一頁
const useTablePaginationActionsStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
function TablePaginationActions(props) {
    const classes = useTablePaginationActionsStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}


const useBaseTableStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflow: "auto"
    },
    showStatus: {
        display: "block",
        overflow: "hidden"
    },
    tableHead: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
    },
    tableBody: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: 500
    },
    th: {
        height: 40,
        padding: theme.spacing(0.6, 2),
        color: "#0a2f5c",
        fontSize: "1rem",
        fontWeight: "bold",
        "&:first-of-type": {
            borderTopLeftRadius: 6
        },
        "&:last-of-type": {
            borderTopRightRadius: 6
        },
        backgroundColor: "#cfe4ff"
    },
    sort: {
        color: "#0a2f5c"
    },
    emptySymbolWrap: {
        display: "flex",
        alignItems: "center"
    },
    emptySymbol: {
        display: "inline-block",
        width: 26
    },
    col: {
        wordBreak: "break-all",
        height: 30,
        padding: "21px 10px",
        color: "#285a99",
        fontSize: "0.875rem",
        borderBottom: "none",
        borderLeft: "1px solid #DBEBFF",
        "&:first-child": {
            backgroundColor: "#fff",
            borderLeft: "none"
        },
        "& .MuiFormControlLabel-root": {
            marginLeft: 0
        }
    },
    denseCol: {
        padding: "7px 10px"
    },
    row: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
        borderBottom: "1px solid #8AB2E4",
        "&:last-child": {
            border: "none"
        }
    },
    loading: {
        height: "100%",
        "& td": {
            border: "none"
        }
    },
    noData: {
        "& td": {
            border: "none"
        }
    },
    active: {
        color: "#0458c0 !important"
    },
    paginationToolbar: {
        overflow: "hidden",
        padding: 0,
        minHeight: 40,
        maxHeight: 40
    },
    selectRoot: {
        lineHeight: 1.5,
        fontSize: 14,
        borderRadius: 6,
        backgroundColor: "#eef5ff"
    },
    selectButton: {
        position: "sticky",
        bottom: 0,
        zIndex: 1,
        backgroundColor: "#fff",
        "& .MuiIconButton-root": {
            color: "#285a99"
        },
        "& .Mui-disabled": {
            color: "#47b2a2"
        }
    },
    captionColor: {
        color: "#285a99"
    },
    defaultImgWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px 0"
    },
    defaultWord: {
        color: "#0a2f5c",
        fontSize: 18
    },
    loadingWrapper: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
}));
/**
 * @description 基本 Table 封裝，包含調整頁數功能， columns 及 data 結構在下面示範
 *
 * @todo
 *   1. column fixed option 改為可以決定 fixed 在左邊或右邊
 *   2. 獨立 FinalTable 資料夾 以及 拆分 FinalTable.js 各個 component
 *
 * @param {Array} [rowsPerPageOptions = [10, 15]] 顯示頁數的選項 e.g. [3, 6, 9]
 * @param {Array} [data] 顯示於 tbody 資料，key 值須對應到 columns.id value
 * @param {[Object]} [columns] 描述每一 row 的 component 
 * @param {Boolean|Component} [isLoading = false] Loading 時 tbody component 
 * @param {Boolean|Component} [nodata = false] 結束 loading 且沒資料時 tbody component 
 * @param {String} [defaultImgWord] typeof nodata === boolean && nodata 時顯示的文字
 * @param {Object} [conditionalLoading[key: String|Number, value: String|Array]] 局部顯示「loading」狀態，使用 <Skeleton />，K height="16" ey 可以指定 row index 或是使用 "all" 表示所有 row；value 可以用 Array 指定哪些 column 或是使用 "all" 表示所有 column
 *
 * @example
    columns = [
    {
        id: "name",     // isRequired
        label: "Name",  // isRequired
        order: false,
        fixed: true // sticky 該 column 至最左
    },
    {
        id: "duration",     // isRequired
        label: "Duration",  // isRequired
        order: true,
        component (data) {  // data 是該 wor 整包物件資料
            return (<>{data.duration} week(s)</>);
        }
    ];

    // 所有 row 的 1, 3, 5 column 顯示 skeleton
    conditionalLoading = {
        "all": [1, 3, 5]
    };

    // 第 0 row 的 所有 column 顯示 skeleton
    // 第 1 row 的 2, 4, 6 column 顯示 skeleton
    // 第 2 row 的 1, 3, 5 column 顯示 skeleton
    conditionalLoading = {
        0: "all",
        2: [1, 3, 5],
        1: [2, 4, 6]
    };
 */
const BasicTable = (props) => {
    /**
     * @param onChangeTablePagination 改變頁數的 callback
     * @returns[新頁數<Number>, 新選項(newValue) <Number>]
     */
    const {
        classes = {},
        columns = [],
        data = [],
        dataLength = 0,
        dataPage = 0,
        rowsPerPageOptions = [10, 15],
        getRowDomRef = null,
        onChangeTablePagination = null,
        onChangeTableSort = null,
        isLoading = false,
        conditionalLoading = {},
        defaultImgWord = "",
        pagination = false,
        infiniteScroll = false,
        dense = false,
        nodata = false,
        ...others
    } = props;

    let currentClasses = useBaseTableStyles();
    currentClasses = {
        ...currentClasses,
        root: clsx(currentClasses.root, classes.root),
        tableContainer: clsx(currentClasses.tableContainer, classes.tableContainer),
        table: clsx(currentClasses.table, classes.table),
        tableHead: clsx(currentClasses.tableHead, classes.tableHead),
        tableBody: clsx(currentClasses.tableBody, classes.tableBody),
        col: clsx(currentClasses.col, classes.col),
        row: clsx(currentClasses.row, classes.row),
        th: clsx(currentClasses.th, classes.th),
        loading: clsx(currentClasses.loading, classes.loading)
    };

    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(dataPage);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const rowDomRef = useRef([]);
    const tableRootRef = useRef();

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === "desc";
        const newOrder = isDesc ? "asc" : "desc";
        setOrder(newOrder);
        setOrderBy(property);
        onChangeTableSort && onChangeTableSort(newOrder, property);
    };

    const handleChangePage = (event, newPage) => {
        onChangeTablePagination && onChangeTablePagination(newPage, rowsPerPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setRowsPerPage(newValue);
        onChangeTablePagination && onChangeTablePagination(page, newValue);
        setPage(0);
    };

    const isSlicePages = (data) => {
        if (pagination) {
            const slicedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
            return slicedData
        }
        return data
    }


    const _renderTableItem = (row, rowIndex, column) => {
        const value = row[column.id] || "--";
        const content = column.component
            ? column.component(row, rowIndex)
            : value;

        return (<>{content}</>);
    };

    const TbodyStatusWrapper = ({ children, ...others }) => (
        <TableRow
            classes={{
                root: clsx(
                    currentClasses.row,
                    currentClasses.loading
                )
            }}
            style={{
                position: "absolute",
                inset: 0,
                margin: "auto"
            }}
            {...others}
        >
            <TableCell>
                {children}
            </TableCell>
        </TableRow>
    );
    const _renderNodata = () => {
        if (React.isValidElement(nodata)) {
            return (
                <TbodyStatusWrapper>
                    <div className={currentClasses.defaultImgWrapper}>
                        {nodata}
                    </div>
                </TbodyStatusWrapper>
            );
        }

        if (isBoolean(nodata)) {
            const renderDefaultNoData = nodata
                ? (<StatusImg />)
                : (
                    <StatusImg
                        type="inputData"
                        word={defaultImgWord}
                    />
                );

            return (
                <TbodyStatusWrapper>
                    <div className={currentClasses.defaultImgWrapper}>
                        {renderDefaultNoData}
                    </div>
                </TbodyStatusWrapper>
            );
        }
    };
    const _renderLoading = () => {
        if (React.isValidElement(isLoading)) {
            return (
                <TbodyStatusWrapper>
                    {isLoading}
                </TbodyStatusWrapper>
            );
        }

        if (isBoolean(isLoading)) {
            return (
                <StatusImg type="loading" word="Data is loading" />
            );
        }
    };
    const renderTableBody = () => {
        if (isLoading) return _renderLoading();
        if (!data?.length) return _renderNodata();

        return (
            isSlicePages(data).map((row, rowIndex) => {
                const loadingAllCols = conditionalLoading["all"];
                const loadingCols = conditionalLoading[rowIndex];
                const loadingAllRows = loadingAllCols === "all" || loadingCols === "all";

                return (
                    <RootRef
                        key={rowIndex}
                        rootRef={(el) => rowDomRef.current[rowIndex] = el}
                    >
                        <TableRow classes={{ root: currentClasses.row }}>
                            {
                                columns.map((column, colIndex) => {
                                    let fixedStyle = {};
                                    if (column.fixed) {
                                        let left = 0;
                                        if (colIndex > 0) {
                                            left = columns[colIndex - 1].width;
                                        }
                                        fixedStyle = {
                                            position: "sticky",
                                            left,
                                            zIndex: 2
                                        }
                                    }

                                    const TableCellWrapper = (props) => (
                                        <TableCell
                                            key={colIndex}
                                            style={{
                                                minWidth: column.width,
                                                maxWidth: column.width,
                                                width: column.width,
                                                ...fixedStyle
                                            }}
                                            classes={{
                                                body: clsx(currentClasses.col, {
                                                    [currentClasses.denseCol]: dense
                                                })
                                            }}
                                            {...props}
                                        />
                                    );

                                    if (
                                        loadingAllCols?.includes(colIndex) ||
                                        loadingCols?.includes(colIndex) ||
                                        loadingAllRows
                                    ) {
                                        return (
                                            <TableCellWrapper key={colIndex} >
                                                <Skeleton height={20} />
                                            </TableCellWrapper>
                                        )
                                    }

                                    return (
                                        <TableCellWrapper key={colIndex}>
                                            {
                                                _renderTableItem(
                                                    row,
                                                    page * rowsPerPage + rowIndex,
                                                    column
                                                )
                                            }
                                        </TableCellWrapper>
                                    )
                                })
                            }
                        </TableRow>
                    </RootRef>
                )
            })
        );
    };


    useEffect(() => {
        const rowHeight = [];

        rowDomRef.current.forEach(item => {
            rowHeight.push(item?.clientHeight)
        })

        getRowDomRef && getRowDomRef(rowHeight);
    }, [data])

    return (
        <div ref={tableRootRef} className={currentClasses.root}>
            <Paper>
                <TableContainer classes={{ root: currentClasses.tableContainer }}>
                    <Table
                        classes={{
                            root: clsx(currentClasses.table, {
                                [currentClasses.showStatus]: (!data?.length || isLoading)
                            })
                        }}
                    >
                        <EnhancedTableHead
                            columns={columns}
                            classes={currentClasses}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            {...others}
                        />
                        <TableBody
                            classes={{ root: currentClasses.tableBody }}
                        >
                            {renderTableBody()}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* 之後處理分頁功能 */}
                {
                    pagination
                        ? (
                            <TablePagination
                                classes={{
                                    root: currentClasses.selectButton,
                                    selectRoot: currentClasses.selectRoot,
                                    toolbar: currentClasses.paginationToolbar,
                                    caption: currentClasses.captionColor
                                }}
                                rowsPerPageOptions={rowsPerPageOptions}
                                component="div"
                                count={dataLength ? dataLength : data.length}
                                rowsPerPage={rowsPerPage}
                                labelRowsPerPage={"Rows Per Page"}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        )
                        : null
                }
            </Paper>
        </div>
    );
}

export { BasicTable };

