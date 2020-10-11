import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import TitleBar from "./component/image/TitleBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteDialog from "./component/image/DeleteDialog";
import ImageList from "./component/image/ImageList";
import AuthenticationService from "./service/AuthenticationService";
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            filter: '',
            isLoading: true,
            deleteOpen: false,
            deleteImage: null,
            hasNext: false,
            pageNum: 0
        }

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateImages = this.updateImages.bind(this);
    }

    componentDidMount() {
        this.updateImages();
    }

    updateImages() {
        axios.get('/user/images?pageNum=' + this.state.pageNum + '&pageSize=25')
            .then(response => {
                let data = response.data;
                let array = this.state.images.concat(data.images);
                this.setState({images: array, isLoading: false, hasNext: data.hasNext})
            });

        this.setState({pageNum: this.state.pageNum + 1});
    }

    onUpload = event => {
        const formData = new FormData();

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('images', event.target.files[i]);
        }

        axios.post('/user/' + AuthenticationService.getLoggedInUser() + '/upload', formData)
            .then(response => {
                this.setState({images: [], pageNum: 0})
                this.updateImages();
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

        axios.post(api + '/delete/' + deleteImage)
            .then(response => {
                this.setState({deleteOpen: false, images: [], pageNum: 0})
                this.updateImages();
            }).catch((e) => {
            this.setState({deleteOpen: false})
            if (e.response && e.response.status >= 400) {
                alert("You must be an admin to delete image other than your own")
            } else {
                alert("Something went wrong")
            }
        })
    }

    onClickDelete(id) {
        this.setState({
            deleteOpen: true,
            deleteImage: id
        })
    }

    onSearch(e) {
        this.setState({filter: e.target.value})
    }

    render() {
        const {images, isLoading, filter, hasNext} = this.state;

        if (isLoading) {
            return <CircularProgress/>
        }

        const filtered = images.filter(i => i.name.includes(filter))

        return (
            <InfiniteScroll
                dataLength={images.length}
                next={this.updateImages}
                hasMore={hasNext}
                loader={<CircularProgress/>}
                endMessage={
                    <p style={{textAlign: 'center', color: 'white'}}>
                        <b>End of images</b>
                    </p>
                }
                style={{overflow: 'hidden', height: 'auto'}}
            >
                <DeleteDialog open={this.state.deleteOpen} onClose={this.onDeleteClose} onDelete={this.onDelete}/>
                <TitleBar onUpload={this.onUpload} onSearch={this.onSearch}/>
                <ImageList images={filtered} onClickDelete={this.onClickDelete}/>
            </InfiniteScroll>
        )
    }

}

export default App;
