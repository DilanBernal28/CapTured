package co.edu.ue.controller.admin;

import co.edu.ue.model.User;
import co.edu.ue.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("adminUserController")
@RequestMapping("/api/admin/usr")
@CrossOrigin("*")
public class UserController {

  @Autowired
  IUserService service;

  @GetMapping(value="users", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<User>> getAllRegister(){
    List<User> datos = service.allUser();
    HttpHeaders headers = new HttpHeaders();
    headers.add("cantidad_datos", String.valueOf(datos.size()));
    return new ResponseEntity<>(datos,headers,HttpStatus.OK);
  }

  @GetMapping(value = "user/status/{status}")
  public ResponseEntity<List<User>> getAllStatus(@PathVariable("Status") User.Status status){
    if(status == User.Status.activo || status == User.Status.baneado || status == User.Status.suspendido) {
      List<User> datos = service.getByStatus(status);
      try {
        return new ResponseEntity<>(datos,HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.CONFLICT);
      }
    }else {
      return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
  }

  @GetMapping(value = "user/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") int id){
    if(service.getById(id) == null) {
      return	new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }else return new ResponseEntity<>(service.getById(id),HttpStatus.ACCEPTED);
  }

  @DeleteMapping(value = "user/delete/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable("id") int id){
    service.deleteUser(id);
    return ResponseEntity.noContent().build();
  }


}
