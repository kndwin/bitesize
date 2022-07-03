import { Page } from "common/ui";

import { Courses } from "./Courses";
import { Header } from "./Header";

export function Dashboard() {
  return (
    <Page variant="container">
      <Header />
      <Courses />
    </Page>
  );
}
