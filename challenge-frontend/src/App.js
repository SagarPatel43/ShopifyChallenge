import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {withStyles} from "@material-ui/core/styles";
import TitleBar from "./component/TitleBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteDialog from "./component/DeleteDialog";
import ImageList from "./component/ImageList";
import AuthenticationService from "./AuthenticationService";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden'
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            filter: '',
            isLoading: true,
            deleteOpen: false,
            deleteImage: null
        }

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.updateImages();
    }

    updateImages() {
        axios.get('/user/images')
            .then(response => {
                this.setState({images: response.data, isLoading: false})
            });
    }

    onUpload = event => {
        const formData = new FormData();

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('images', event.target.files[i]);
        }

        axios.post('/user/' + AuthenticationService.getLoggedInUser() + '/upload', formData)
            .then(response => {
                let array = this.state.images.concat(response.data);

                this.setState({images: array})
            }).catch(e => {
            console.log(e);
        });
    }

    onDeleteClose = () => {
        this.setState({deleteOpen: false});
    }

    onDelete = () => {
        let deleteImage = this.state.deleteImage;
        let isAdmin = AuthenticationService.isAdmin()
        let api = isAdmin ? '/admin' : '/user';

        axios.post(api + '/delete/' + deleteImage.id)
            .then(response => {
                // copy array
                let array = [...this.state.images];
                array.splice(deleteImage.index, 1);

                this.setState({images: array, deleteOpen: false});
            }).catch((e) => {
            this.setState({deleteOpen: false})
            if (e.response && e.response.status >= 400) {
                alert("You must be an admin to delete images other than your own")
            } else {
                alert("Something went wrong")
            }
        })
    }

    onClickDelete(index, id) {
        this.setState({
            deleteOpen: true,
            deleteImage: {index, id}
        })
    }

    onSearch(e) {
        this.setState({filter: e.target.value})
    }

    render() {
        const {images, isLoading, filter} = this.state;
        const {classes} = this.props;

        if (isLoading) {
            return <CircularProgress/>
        }

        const filtered = images.filter(i => i.name.includes(filter))

        return (
            <div className={classes.root}>
                <DeleteDialog open={this.state.deleteOpen} onClose={this.onDeleteClose} onDelete={this.onDelete}/>
                <TitleBar onUpload={this.onUpload} onSearch={this.onSearch}/>
                <ImageList images={filtered} onClickDelete={this.onClickDelete}/>
            </div>
        )
    }

}

export default withStyles(styles)(App);
