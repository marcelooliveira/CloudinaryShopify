import gql from 'graphql-tag';
// import { useMutation } from '@apollo/client';
import { Query, useMutation } from 'react-apollo';
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

// const CREATE_PRODUCT_MEDIA = gql`
//   mutation createProductMedia(
//     $id: ID!
//     $media: [CreateMediaInput!]!
//   ) {
//     productCreateMedia(productId: $id, media: $media) {
//       media {
//         ... fieldsForMediaTypes
//         mediaErrors {
//           code
//           details
//           message
//         }
//       }
//       product {
//         id
//       }
//       mediaUserErrors {
//         code
//         field
//         message
//       }
//     }
//   }
  
//   fragment fieldsForMediaTypes on Media {
//     alt
//     mediaContentType
//     preview {
//       image {
//         id
//       }
//     }
//     status
//     ... on Video {
//       id
//       sources {
//         format
//         height
//         mimeType
//         url
//         width
//       }
//     }
//     ... on ExternalVideo {
//       id
//       embeddedUrl
//     }
//     ... on Model3d {
//       sources {
//         format
//         mimeType
//         url
//       }
//     }
//   }
//   `;
  
  const ResourceListWithProducts = () => {
  
  // const [createProductMedia, { createProductMediaData }] = useMutation(CREATE_PRODUCT_MEDIA);
  
  const uploadMediaClick = (productId) => {
    
    const productIdNumber = productId.split('/')[productId.split('/').length - 1];

    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'dthv50qgh',
      upload_preset: 'ihfwipla',
      showAdvancedOptions: true    
    }, (error, result) => { if (result.event == "success") {
      // var createMediaInputArray = [{
      //   mediaContentType: 'EXTERNAL_VIDEO',
      //   originalSource: result.info.secure_url
      // }];

      // var public_ids = [result.info.public_id];

      // createProductMedia({ variables: { id: productId, media: createMediaInputArray } });
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
