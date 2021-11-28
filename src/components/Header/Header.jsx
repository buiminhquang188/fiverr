import { Fragment, memo, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import fiver_logo from "assets/images/fiver_logo.svg";
import { actLogout } from "containers/shared/Auth/module/action";
import { connect } from "react-redux";
import adminApi from "apis/adminApi";
import { Spin } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const navigation = [
  { name: "Fiverr Business", href: "/", current: false },
  { name: "Explore", href: "/", current: false },
  { name: "English", href: "/", current: false },
  { name: "USD", href: "/", current: false },
  { name: "Become a seller", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header(props) {
  const [userData, setUserData] = useState({
    userData: null,
    isLoading: true,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { currentUser } = props;
    console.log("currentUser", currentUser);
    window.scrollTo(0, 0);
    if (currentUser) {
      adminApi
        .fetchUserDetail(currentUser.idUser)
        .then((result) => {
          setUserData({
            userData: result.data,
            isLoading: false,
          });
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setLoading(false);
    }
  }, [props.currentUser]);
  const handleLogout = () => {
    props.logout();
    props.history.push("/");
  };
  if (loading) return <Skeleton />;
  const { currentUser } = props;
  return (
    <Disclosure as="nav" className="bg-white border-b-2 border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={fiver_logo}
                      alt="Fiverr Logo"
                    />
                    <img
                      className="hidden lg:block h-16 w-auto"
                      src={fiver_logo}
                      alt="Fiverr Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6 w-full my-auto">
                  <div className="flex space-x-4 justify-end">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-transparent hover:text-green-400",
                          "px-3 py-2 rounded-md font-medium sm:text-sm lg:text-base"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {currentUser === null ? (
                      <Link
                        to="/login"
                        className="text-gray-600 hover:bg-transparent hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                    ) : (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                          type="button"
                          className="bg-green-500 p-1 rounded-full text-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative z-10">
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              {currentUser && !userData.isLoading ? (
                                <img
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={
                                    currentUser && userData.userData?.avatar
                                      ? userData.userData.avatar
                                      : `https://ui-avatars.com/api/?name=${currentUser.nameUser.substr(
                                          0,
                                          currentUser.nameUser.indexOf("@")
                                        )}`
                                  }
                                  alt={currentUser.name + " avatar"}
                                />
                              ) : (
                                <Spin />
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userData.userData.role === "ADMIN" ? (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/dashboard"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Management
                                    </Link>
                                  )}
                                </Menu.Item>
                              ) : null}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={{
                                      pathname: `/user/${currentUser.nameUser.substr(
                                        0,
                                        currentUser.nameUser.indexOf("@")
                                      )}`,
                                      state: { id: currentUser.idUser },
                                    }}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                    onClick={handleLogout}
                                  >
                                    Sign out
                                  </div>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actLogout()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
