// src/lib/pages/home.tsx

import { BasicPage } from '../lib/components/BasicPage.tsx';

import Home from '@mui/icons-material/Home';

const HomePage = () => {

  return (
      <>
          <BasicPage
            title="Home"
            icon={<Home />}
          />
      </>
  )
}

export default HomePage;