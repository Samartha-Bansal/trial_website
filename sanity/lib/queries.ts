import { defineQuery } from "next-sanity";

export const START_QUERY = defineQuery(`*[_type == "start" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc) {
    _id, 
    title, 
    slug, 
    _createdAt, 
    author -> { _id , name, image, bio}, 
    views, 
    description, 
    category, 
    image,
}`);

export const START_BY_ID = defineQuery(`*[_type == "start" && _id==$id][0] {
    _id, 
    title, 
    slug, 
    _createdAt, 
    author -> {
      _id, name, username,image, bio},
    views, 
    description, 
    category, 
    image,
    pitch,
}`);

export const START_VIEW_QUERIES = defineQuery(`*[_type == "start" && _id == $id][0]{
  _id, views
}`);

export const AUTHOR_BY_GITHUB_ID = defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
}`);

export const AUTHOR_BY_ID = defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio,
}`);

export const START_BY_AUTHOR_QUERY = defineQuery(`*[_type == "start" && author._ref == $id] | order(_createdAt desc) {
    _id, 
    title, 
    slug, 
    _createdAt, 
    author -> { _id , name, image, bio}, 
    views, 
    description, 
    category, 
    image,
}`);

export const PLAYLIST_QUERY = defineQuery(`*[_type == "playlist" && slug.current == $slug][0] {
    _id, 
    title, 
    slug, 
    select[] -> {
      _createdAt, 
      title, 
      slug, 
      author -> { _id , name, slug, image, bio}, 
      views, 
      description, 
      category, 
      image,
      pitch,
    },
}`);