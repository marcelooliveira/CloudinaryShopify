import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';

const GET_PRODUCTS = gql`
{
  products(first: 1) {
    edges {
      node {
        id
        handle
        title
        images(first:1) {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              displayName
            }
          }
        }
      }
    }
  }
}
`;

const uploadMediaClick = () => {
  myWidget.open();
}

class ResourceListWithProducts extends React.Component {
  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;

          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: 'Product', plural: 'Products' }}
                items={data.products.edges}
                renderItem={item => {
                  const media = (<Thumbnail source={item.node.images.edges[0].node.originalSrc}/>);
                  
                  return (
                    <ResourceList.Item
                      id={item.node.id}
                      media={media}>
                      <Stack>
                        <Stack.Item fill>
                            <TextStyle variation="strong">
                              {item.node.title}
                            </TextStyle>
                        </Stack.Item>
                        <Stack.Item>
                          <button 
                          name="upload_widget" 
                          className="cloudinary-button"
                          onClick={uploadMediaClick}>Upload media</button>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;
