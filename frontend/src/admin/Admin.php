<?php
  $page = "Dashboard.php";
  $p = "Dashboard";
  if(isset($_GET['p']))
  {
    $p = $_GET['p'];
    switch($p)
    {
      case"Banner" : $page = "Banner.php";
        break;
      case"Product" : $page = "Product.php";
        break;
      case"Categories" : $page = "Categories.php";
        break;
    }
  }


?>
<!DOCTYPE html>
<html lang="en">
<?php include "include/Head.php" ?>
<body>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <?php include "include/Nav.php" ?>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_settings-panel.html -->
      

      <!-- partial:partials/_sidebar.html -->
      <?php include "include/Navsidebar.php" ?>
      <!-- partial -->
      <?php include "$page" ?>
      <?php include "include/Footer.php" ?>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  
  <!-- plugins:js -->
  <?php include "include/Foot.php" ?>
</body>


</html>
