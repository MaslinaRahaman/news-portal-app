import React, { useState, useEffect } from "react";
import {  Menu, Segment } from "semantic-ui-react";
import axios from "axios";
import NewsList from "./NewsList"


const Navbar = () => {
  const [activeItem, setActiveItem] = useState("business");
  const [articles, setArticles] = useState([]);
  const [location, setLocation] = useState("us");

  const [term, setTerm] = useState("trump");
  const [result, setResult] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  //fire on OnClick event
  useEffect(() => {
    const getArticles = async e => {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${location}&category=${activeItem}&apiKey=69d66e4e9a3e4ce4a6cad2068c1dc33b`
      );
      setArticles(res.data.articles);
    };
    getArticles();
  }, [activeItem,location]);

  //for first render
  useEffect(() => {
    const getArticles = async e => {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${location}&category=${activeItem}&apiKey=69d66e4e9a3e4ce4a6cad2068c1dc33b`
      );
  
    };
    getArticles();
  }, []);

  const handleItemClick = e => setActiveItem(e.target.outerText.toLowerCase());

 

//hook for search term
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);

    return () => {
      clearTimeout(timerID);
    };
  }, [term]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${term}&apiKey=69d66e4e9a3e4ce4a6cad2068c1dc33b`
      );
    
       setResult(res.data.articles);
    };

    if (Object.keys(term).length !== 0) {
      fetchData();
    }
  }, [debouncedTerm, term]);

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="business"
          active={activeItem === "business"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="entertainment"
          active={activeItem === "entertainment"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="general"
          active={activeItem === "general"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="health"
          active={activeItem === "health"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="science"
          active={activeItem === "science"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="sports"
          active={activeItem === "sports"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="technology"
          active={activeItem === "technology"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={term}
                data-testid="searchTerm"
                onChange={(e) => {
                  setTerm(e.target.value)
                  
                }}
              />
            </div>
          </Menu.Item>
           <Menu.Item>
              <select className="ui dropdown"  onChange={(e) => {
                 
                   setLocation(e.target.value)
                }}>
                  <option value="">Location</option>
                  <option value="gb">United Kingdom</option>
                  <option value="us">United States</option>
            </select>
           </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment>
      {
          !articles.length?
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
            : <NewsList articles={articles} activeItem={activeItem} result={result} term={term} />

      }
      </Segment>
    </div>
  );
};

export default Navbar;
