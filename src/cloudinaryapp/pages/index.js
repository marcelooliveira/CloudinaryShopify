import { Heading, Page } from "@shopify/polaris";
import ProductList from '../components/ProductList';

const Index = () => (
  <div>
    <Page>
      <ProductList />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
    </Page>
  </div>
)

export default Index;
