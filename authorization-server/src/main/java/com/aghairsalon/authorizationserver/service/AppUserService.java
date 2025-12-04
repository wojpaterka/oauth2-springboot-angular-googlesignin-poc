package com.aghairsalon.authorizationserver.service;

import com.aghairsalon.authorizationserver.dto.CreateAppUserDTO;
import com.aghairsalon.authorizationserver.dto.MessageDTO;
import com.aghairsalon.authorizationserver.entity.AppUser;
import com.aghairsalon.authorizationserver.entity.Role;
import com.aghairsalon.authorizationserver.enums.RoleName;
import com.aghairsalon.authorizationserver.repository.AppUserRepository;
import com.aghairsalon.authorizationserver.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public MessageDTO createUser(CreateAppUserDTO dto) {
        AppUser appUser = AppUser.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        Set<Role> roles = new HashSet<>();
        dto.getRoles().forEach(r -> {
            Role role = roleRepository.findByRole(RoleName.valueOf(r))
                    .orElseThrow(() -> new RuntimeException("Role not found: " + r));
            roles.add(role);
        });

        appUser.setRoles(roles);
        appUserRepository.save(appUser);
        return new MessageDTO("Usuario " + appUser.getUsername() + " guardado");
    }
}
