import getConfig from 'next/config';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';

const { publicRuntimeConfig } = getConfig();

const GET_PRODUCTS = gql`
{
  products(first: 100) {
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

  const ResourceListWithProducts = () => {
  
  const uploadMediaClick = (productId) => {
    
    const productIdNumber = productId.split('/')[productId.split('/').length - 1];

    var myWidget = cloudinary.createUploadWidget({
      cloudName: publicRuntimeConfig.cloudinaryCloudName,
      upload_preset: publicRuntimeConfig.cloudinaryUploadPreset,
      showAdvancedOptions: true
    }, (error, result) => { if (result.event == "success") {

      console.log(result.info);
    } })

    myWidget.update({tags: [productIdNumber]});
    myWidget.open();
  }

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
                const media = item.node.images.edges.length > 0
                ? (<Thumbnail source={item.node.images.edges[0].node.originalSrc}/>)
                : (<Thumbnail source=''/>);
                
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
                        onClick={uploadMediaClick.bind(this, item.node.id)}>Upload media</button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        );
      }}
    </Query>)
  }

export default ResourceListWithProducts;
