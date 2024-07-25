<script>
import axios from "axios";
export default {
  data() {
    return {
      result: [],
      url: "http://127.0.0.1:8000/api/helal/purchases",

      product_url: "http://127.0.0.1:8000/api/helalp/products",
      vendor_url: "http://127.0.0.1:8000/api/helalv/vendors",
      vresult: [],
      presult: [],
      errors: [],

      inputs: "",
      id: "",
      product_id: "",
      unit: "",
      price: "",
      quantity: "",
      vendor_id: "",
      bill_number: "",
      voucher_number: "",
      date: new Date().toLocaleDateString("en-CA"),
      totalprice: "",
      msg: "",
    };
  },
  methods: {
    // addInput() {
    //   this.inputs.push(this.inputs.length + 1);
    // },
    async getTotalPrice() {
      const total = this.price * this.quantity;
      this.totalprice = total;
    },
    async getProductPrice() {
      const id = ("Selected Product ID:", this.product_id);
      const response = await fetch(`${this.product_url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const products = await response.json();
      this.price = products.data.price;
      this.unit = products.data.unit;
      const total = this.price * this.quantity;
      this.totalprice = total;
      //console.log(products.data);
    },
    async getVendorList() {
      const response = await fetch(this.vendor_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const vendors = await response.json();
      this.vresult = vendors.data;
      //console.log(vendors.data);
    },
    async getProductList() {
      const response = await fetch(this.product_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const products = await response.json();
      this.presult = products.data;
      //console.log(products.data);
    },
    async getPurchaseList() {
      const response = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const purchases = await response.json();
      this.result = purchases.data;
      //console.log(purchases.data);
    },
    save() {
      axios
        .post(this.url, {
          product_id: this.product_id,
          unit: this.unit,
          price: this.price,
          quantity: this.quantity,
          vendor_id: this.vendor_id,
          bill_number: this.bill_number,
          voucher_number: this.voucher_number,
          date: this.date,
        })
        .then((data) => {
          console.log(data.data.message);
          this.getPurchaseList();
          this.id = "";
          this.product_id = "";
          this.unit = "";
          this.price = "";
          this.quantity = "";
          this.vendor_id = "";
          this.bill_number = "";
          this.voucher_number = "";
          this.totalprice="",
          (this.date = new Date().toLocaleDateString("en-CA")),
            (this.msg = data.data.message);
          setTimeout(() => {
            this.msg = "";
          }, 10000);
        });
    },
    async edit(id) {
      axios.get(`${this.url}/${id}/edit`)
      .then((response) => {
        const d = response.data.data
         this.id=d.id
         this.product_id=d.product_id
         this.unit=d.unit
         this.price=d.price
         this.quantity=d.quantity
         this.vendor_id=d.vendor_id
         this.bill_number=d.bill_number
         this.voucher_number=d.voucher_number
         this.date=d.date
         const total = this.price * this.quantity;
        this.totalprice = total;
        console.log(response.data.message)
          this.msg = response.data.message,
          setTimeout(() => {
            this.msg = "";
          }, 5000);
      });
    },
    deletepurchases(id) {
      axios.delete(`${this.url}/${id}`);
      this.getPurchaseList();
    },
    async updatepurchases() {
      axios.put(`${this.url}/${this.id}`, {
            product_id: this.product_id,
            unit: this.unit,
            price: this.price,
            quantity: this.quantity,
            vendor_id: this.vendor_id,
            bill_number: this.bill_number,
            voucher_number: this.voucher_number,
            date: this.date
        })
        .then((response) => {
          console.log(response.data.message);
          this.getPurchaseList();
          this.id = "";
          this.product_id = "";
          this.unit = "";
          this.price = "";
          this.quantity = "";
          this.vendor_id = "";
          this.bill_number = "";
          this.voucher_number = "";
          this.totalprice="";
          (this.date = new Date().toLocaleDateString("en-CA")),
            (this.msg = response.data.message);
          setTimeout(() => {
            this.msg = "";
          }, 5000);
        });
    },
  },
  mounted() {
    this.getVendorList();
    this.getPurchaseList();
    this.getProductList();
  },
  watch: {},
  computed: {},
};
</script>

<template>
  <router-link to="/">Home</router-link> &nbsp;
  <router-link to="/userlist">User</router-link> &nbsp;
  <router-link to="/login">Login</router-link> &nbsp;
  <router-link to="/purcheses">Purcheses</router-link> &nbsp;
  <div class="container">
    <div class="card">
      <div class="card-header border-transparent">
        <h3 class="card-title">ADD Slider</h3>
        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-card-widget="collapse">
            <i class="fas fa-minus"></i>
          </button>
          <button type="button" class="btn btn-tool" data-card-widget="remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="card-body">
        <div class="card-body">
          <strong style="color: red">{{ msg }}</strong>

          <div class="row">
            <div class="col-4">
              <div class="form-group row">
                <label for>Bill Number</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id
                    placeholder="Bill Number"
                    v-model="bill_number"
                  />
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="form-group row">
                <label>Voucher Number</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Voucher Number"
                    v-model="voucher_number"
                  />
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="form-group row">
                <label>Added Date</label>
                <div>
                  <input type="date" v-model="date" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>
                  <div class="form-group row">
                    <label>Vendor Name</label>
                    <div>
                      <select class="form-control" v-model="vendor_id">
                        <option value>Select Vendor Name</option>
                        <option v-for="(vdata, i) in vresult" :key="i" :value="vdata.id">
                          {{ vdata.people.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label>Product Name</label>
                    <div>
                      <select
                        class="form-control"
                        v-model="product_id"
                        @change="getProductPrice()"
                      >
                        <option value>Select Product Name</option>
                        <option v-for="(pdata, i) in presult" :key="i" :value="pdata.id">
                          {{ pdata.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label>Product Quantity</label>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Quantity"
                        v-model="quantity"
                        @keyup="getTotalPrice()"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label>Product Unit</label>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Unit"
                        v-model="unit"
                        readonly
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label>Product Unit Price</label>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Unit Price"
                        v-model="price"
                        readonly
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label>Total Price</label>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Total"
                        v-model="totalprice"
                        readonly
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <!-- <tr v-for="(input, index) in inputs" :key="++index">
                <div>
                  <td>
                    <div>
                      <select class="form-control" v-model="vendor_id[index]">
                        <option value>Select Vendor Name</option>
                        <option v-for="(vdata, i) in vresult" :key="i" :value="vdata.id">
                          {{ vdata.people.name }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div>
                      <select
                        class="form-control"
                        v-model="product_id[index]"
                        @change="getProductPrice()"
                      >
                        <option value>Select Product Name</option>
                        <option v-for="(pdata, i) in presult" :key="i" :value="pdata.id">
                          {{ pdata.name }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Quantity"
                        v-model="quantity[index]"
                        @keyup="getTotalPrice()"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Unit"
                        v-model="unit[index]"
                        readonly
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Product Unit Price"
                        v-model="price[index]"
                        readonly
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Total"
                        v-model="totalprice[index]"
                        readonly
                      />
                    </div>
                  </td>
                </div>
              </tr> -->
            </tbody>
          </table>
          <hr />
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4"></div>
          </div>
          <!-- <div class="form-group row">
            <label> </label>
            <div>
              <input
                type="button"
                class="form-control btn btn-success"
                @click="addInput()"
                value="Add More"
              />
            </div>
          </div> -->
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <a href class="btn btn-info"> Cancel</a>
        <button
          type="submit"
          class="btn btn-primary float-right"
          style="float: inline-end"
          @click="save()"
          v-if="id == ''"
        >
          Submit
        </button>

        <button
          type="submit"
          class="btn btn-primary float-right"
          style="float: inline-end"
          @click="updatepurchases()"
          v-else
        >
          Update
        </button>

        <!-- /.card-footer -->
      </div>
    </div>
  </div>

  <!-- ======================================================================================== -->

  <div class="card">
    <div class="card-header border-transparent">
      <h3 class="card-title">Purchases List</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table m-0 table-striped">
          <thead class="bg-warning">
            <tr>
              <th>SL</th>
              <th>Bill Number</th>
              <th>Voucher Number</th>
              <th>Vendor Name</th>
              <th>Added Date</th>
              <th>Product Name</th>
              <th>Product Quantity</th>
              <th>Product Unit</th>
              <th>Product Unit Price</th>
              <th>Total Price</th>
              <th style="width: 230px" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody v-for="(data, i) in result" :key="i">
            <tr>
              <td>{{ ++i }}</td>
              <td>{{ data.bill_number }}</td>
              <td>{{ data.voucher_number }}</td>
              <td>{{ data.vendor.people.name }}</td>
              <td>{{ data.date }}</td>
              <td>{{ data.product.product_category.name }}</td>
              <td>{{ data.quantity }}</td>
              <td>{{ data.unit }}</td>
              <td>{{ data.price }}</td>
              <td>{{ data.price * data.quantity }}</td>
              <td>
                <button class="btn btn-primary" @click="view(data.id)">View</button>
                <button class="btn btn-success" @click="edit(data.id)">Edit</button>
                <button class="btn btn-danger" @click="deletepurchases(data.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <span class="float-right"> </span>
      </div>

      <!-- /.table-responsive -->
    </div>
    <!-- /.card-body -->
    <div class="card-footer clearfix">
      <a href class="btn btn-sm btn-info float-left">Add Purchases</a>
      <a href class="btn btn-sm btn-secondary float-right" style="float: inline-end"
        >View All Purchases</a
      >
    </div>
    <!-- /.card-footer -->
  </div>
</template>
