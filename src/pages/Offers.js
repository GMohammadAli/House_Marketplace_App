import {useEffect, useState} from "react"
import {collection, getDocs, query, where, orderBy, limit, 
    startAfter, 
}
from "firebase/firestore"
import {db} from "../firebase.config"
import{toast} from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"


function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(null);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get a reference
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(2)
        );

        //Execute Query
        const querySnap = await getDocs(q);

        let listings = [];
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could Not Fetch Listings");
      }
    };

    fetchListings();
    // eslint-disable-next-line
  }, []);

  //Pagination / Load More
  const onMoreFetchListings = async () => {
    try {
      //get a reference
      const listingsRef = collection(db, "listings");

      //create a query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      //Execute Query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could Not Fetch Listings");
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onMoreFetchListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are No Current Offers</p>
      )}
    </div>
  );
}

export default Offers
