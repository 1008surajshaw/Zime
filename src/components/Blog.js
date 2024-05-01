import { AppContext } from '../context/AppContext';
import React, { useContext, useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Table, Tag,Button} from 'antd';
import { Pagination } from 'antd';


const Blog = () => {
  
  const { data, loading, pagination, setPagination  } = useContext(AppContext);
  const [post, setPost] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);

  const handleSeeMore = (index) => {
    setExpandedPostIndex(index);
  };
  
  const handleShowLess = () => {
    setExpandedPostIndex(null);
  };
  

  useEffect(() => {
    console.log("Data from context:", data);
    setPost(data.posts);
  }, [data]);

  useEffect(() => {
    console.log("Post state:", post);
  }, [post]);
  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      width: 300,
      
      render: (text, record, index) => {
        if (text.length > 100 && (expandedPostIndex !== index)) {
          return (
            <>
              {text.substring(0, 80)}...
              <Button type="link" onClick={() => handleSeeMore(index)}>
                See More
              </Button>
            </>
          );
        } else if (expandedPostIndex === index) {
          return (
            <>
              {text}{' '}
              <Button type="link" onClick={handleShowLess}>
                Show Less
              </Button>
            </>
          );
        } else {
          return text;
        }
      },

    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 150,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag  key={tag} onClick={() => handleTagClick(tag)}
              color={selectedTags.includes(tag) ? 'blue' : undefined} className='cursor-pointer'>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
  ];
  

  const handlePaginationChange = (page) => {
    const skip = (page - 1) * pagination.limit;
    setPagination({ ...pagination, skip });
  };
  const handleSearch = () => {
    const filteredData = post.filter((post) =>
    
      selectedTags.every((tag)=>post.tags.includes(tag))
    );
    setPost(filteredData);
  
     
  
    const queryParams = selectedTags.map((tag) => `tag=${tag}`).join('&');
    window.history.pushState({}, '', `/?${queryParams}`);
  };
  
  
  
  return (
    <div className='flex flex-col justify-center align-middle w-full mx-auto'>
      {loading ? (
        <Spinner />
      ) : data.length === 0 ? (
        <p className=''>No data is found</p>
      ) : ( 
        <>

        <div className='text-black px-7 flex justify-between'>
        <p>Selected Tags: <strong className='text-blue-500'>{selectedTags.join(', ').toUpperCase()}</strong></p>
        <Button type="primary" onClick={handleSearch}>Search</Button>
        </div>
        <Table dataSource={post} columns={columns} pagination={false}  />
        </>
      )}
      
      <Pagination
            defaultCurrent={1}
            total={data.total}
            pageSize={pagination.limit}
            onChange={handlePaginationChange}
          />

    </div>
  );
};

export default Blog;
