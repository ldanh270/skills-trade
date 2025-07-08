// Import libraries
import clsx from 'clsx';

// import styles
import styles from './Post.module.scss';

function Post() {
    return (
        <div className={clsx(styles.Post)}>
            <h1>Post</h1>
        </div>
    );
}

export default Post;
