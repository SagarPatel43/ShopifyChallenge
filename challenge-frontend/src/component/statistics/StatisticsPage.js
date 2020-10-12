import React, {Component} from 'react';
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {DataGrid} from '@material-ui/data-grid';
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TitleBar from "../image/TitleBar";

const baseContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
}

const styles = {
    root: {
        backgroundColor: 'rgb(71, 74, 81)',
        color: 'white'
    },
    header: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 30
    },
    topContainer: {
        ...baseContainer,
        marginTop: 10
    },
    bottomContainer: {
        ...baseContainer,
        marginTop: 50
    },
    background: {
        backgroundColor: 'rgb(71, 74, 81)'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    tableHeader: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 20
    }
}


const imageColumns = [
    {field: 'imageName', headerName: 'Image name', width: 150},
    {
        field: 'imageViews',
        headerName: 'Image views',
        type: 'number',
        width: 120,
    }
];

const uploaderColumns = [
    {field: 'role', headerName: 'Role', width: 100},
    {field: 'uploaderName', headerName: 'Uploader name', width: 130},
    {
        field: 'uploads',
        headerName: 'Total uploads',
        type: 'number',
        width: 120,
    }
];

const searchColumns = [
    {field: 'search', headerName: 'Search term', width: 130},
    {
        field: 'searchCount',
        headerName: 'Search count',
        type: 'number',
        width: 120,
    }
];

class StatisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: null,
            isLoading: true,
            notAdmin: false
        }
    }

    componentDidMount() {
        this.updateStatistics();
    }

    updateStatistics() {
        axios.get('/admin/statistics')
            .then(response => {
                console.log(response.data)
                this.setState({statistics: response.data, isLoading: false});
            }).catch(e => {
                if (e.response && e.response.status >= 400 && e.response.status < 500) {
                    this.setState({isLoading: false, notAdmin: true});
                } else {
                    alert("Something went wrong")
                }
        })
    }

    getSearchRows(statistics) {
        let searchRows = [];
        let id = 1;
        for (let topSearch of statistics.topSearches) {
            searchRows.push({id: id++, search: topSearch.query, searchCount: topSearch.queryCount})
        }
        return searchRows;
    }

    getUploaderRows(statistics) {
        let uploaderRows = [];
        let id = 1;
        for (let topUploader of statistics.topUploaders) {
            uploaderRows.push({
                id: id++,
                uploaderName: topUploader.uploaderName,
                uploads: topUploader.uploadCount,
                role: topUploader.role
            })
        }
        return uploaderRows;
    }

    getImagesRows(statistics) {
        let imagesRows = [];
        let id = 1;
        for (let topImage of statistics.topViewedImages) {
            imagesRows.push({id: id++, imageName: topImage.imageName, imageViews: topImage.imageViews})
        }
        return imagesRows;
    }

    getTotalCard(title, count) {
        const {classes} = this.props;

        return (
            <Card className={classes.background}>
                <CardContent>
                    <Typography variant='h2' className={classes.text}>
                        {title}
                    </Typography>
                    <Typography variant='h3' className={classes.text}>
                        {count}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    getTopTable(width, title, rows, columns) {
        const {classes} = this.props;

        return (
            <div style={{width: width, height: 100}}>
                <Typography variant='h4' className={classes.tableHeader}>
                    {title}
                </Typography>
                <DataGrid className={classes.root} rows={rows}
                          columns={columns} hideFooter={true} autoHeight={true}/>
            </div>
        )
    }

    render() {
        const {statistics, isLoading, notAdmin} = this.state;
        const {classes} = this.props;

        if (isLoading) {
            return <CircularProgress/>
        }
        if (notAdmin) {
            return <h1 style={{color: 'white'}}>You must be an admin to view this page</h1>
        }

        return (
            <div>
                <TitleBar cleanTitle={true}/>
                <Typography variant='h1' className={classes.header}>
                    Statistics Page
                </Typography>

                <div className={classes.topContainer}>
                    {this.getTotalCard('Total Views', statistics.totalViews)}
                    {this.getTotalCard('Total Images', statistics.totalImages)}
                    {this.getTotalCard('Total Uploads', statistics.totalUploads)}
                    {this.getTotalCard('Total Deletes', statistics.totalDeletes)}
                </div>
                <div className={classes.bottomContainer}>
                    {this.getTopTable('20%', 'Top Uploaders', this.getUploaderRows(statistics), uploaderColumns)}
                    {this.getTopTable('17%', 'Top Viewed Images', this.getImagesRows(statistics), imageColumns)}
                    {this.getTopTable('17%', 'Top Searches', this.getSearchRows(statistics), searchColumns)}
                </div>

            </div>

        )
    }
}

export default withStyles(styles)(StatisticsPage)
