import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";

export const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-12 p-24">
      <div />
      <div>
        <NavLink to="/user">
          <Card>
            <CardHeader>
              <CardTitle>User</CardTitle>
              <CardDescription>Manage your own data </CardDescription>
            </CardHeader>
          </Card>
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Analyse trends in food waste</CardDescription>
            </CardHeader>
          </Card>
        </NavLink>
      </div>
      <div />
    </div>
  );
};
