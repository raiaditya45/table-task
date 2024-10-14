// App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";

interface Product {
  id: number;
  title: string;
  userId: number;
  body: string;
}

const StyledContainer = styled.div`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  min-height: 100vh;

  .search-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .filter-input {
    width: 200px;
  }
`;

const OrderManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userIdFilter, setUserIdFilter] = useState<number | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        setTotalRecords(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(value, userIdFilter);
  };

  // Handle userId filter change
  const handleUserIdFilterChange = (e: { value: number | null }) => {
    setUserIdFilter(e.value);
    filterData(searchTerm, e.value);
  };

  // Filter data based on search and userId filter
  const filterData = (search: string, userId: number | null) => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.body.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userId !== null) {
      filtered = filtered.filter((product) => product.userId === userId);
    }

    setFilteredProducts(filtered);
    setTotalRecords(filtered.length);
    setCurrentPage(0); // Reset to the first page after filtering
  };

  // Handle page change
  const onPageChange = (event: DataTablePageEvent) => {
    setCurrentPage(event.first / rowsPerPage);
  };

  const userIdOptions = Array.from(new Set(products.map((p) => p.userId))).map(
    (userId) => ({ label: `User ${userId}`, value: userId })
  );

  return (
    <StyledContainer>
              <h1>Product List</h1>
      <div className="search-container">
        <InputText
          className="filter-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title or body"
        />
        <Dropdown
          className="filter-input"
          value={userIdFilter}
          options={[{ label: "All Users", value: null }, ...userIdOptions]}
          onChange={handleUserIdFilterChange}
          placeholder="Filter by User ID"
        />
      </div>

      <DataTable
        value={filteredProducts.slice(
          currentPage * rowsPerPage,
          (currentPage + 1) * rowsPerPage
        )}
       // paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPage={onPageChange}
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" style={{ width: "50px" }} />
        <Column field="title" header="Title" />
        <Column field="body" header="Body" />
        <Column field="userId" header="User ID" style={{ width: "100px" }} />
      </DataTable>

      <Paginator
        first={currentPage * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
      />
    </StyledContainer>
  );
};

export default OrderManagement;
